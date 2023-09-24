package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.global.cache.CacheKey;
import com.daengdaeng.global.domain.LogoutAccessToken;
import com.daengdaeng.global.domain.LogoutAccessTokenRedisRepository;
import com.daengdaeng.global.domain.RefreshTokenRedisRepository;
import com.daengdaeng.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;

    @Override
    public FindMemberResponse findMember() {
        String email = getCurrentEmail();
        log.info(email);
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        return FindMemberResponse.builder()
                .nickname(member.getNickname())
                .email(member.getEmail())
                .build();
    }

    @Override
    public boolean nicknameCheck(String nickname) {
        return memberRepository.findByNickname(nickname).isEmpty();
    }

    @Override
    public void modifyNickname(String nickname) {
        String email = getCurrentEmail();
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isEmpty()) {
            throw new NoSuchElementException("회원이 존재하지 않습니다.");
        }

        Member loginMember = member.get();
        loginMember.updateNickname(nickname);
    }

    @Override
    @CacheEvict(value = CacheKey.USER, key = "#email")
    public void logout(String accessToken, String email) {
        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds((accessToken));
        refreshTokenRedisRepository.deleteById(email);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, email, remainMilliSeconds));

    }

    @Override
    public void removeMember(String accessToken, String email) {
        logout(accessToken, email);
       memberRepository.deleteByEmail(email);
    }

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 이메일 추출
     * @return String : 이메일
     */
    private String getCurrentEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }
}
