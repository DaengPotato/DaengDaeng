package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.global.cache.CacheKey;
import com.daengdaeng.global.domain.LogoutAccessToken;
import com.daengdaeng.global.domain.LogoutAccessTokenRedisRepository;
import com.daengdaeng.global.domain.RefreshToken;
import com.daengdaeng.global.domain.RefreshTokenRedisRepository;
import com.daengdaeng.global.jwt.JwtExpirationEnums;
import com.daengdaeng.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
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
    private final JwtTokenUtil jwtUtil;

    /**
     * Access 토큰 재발행
     * @param refreshToken : JWT 토큰
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
    @Override
    public Map<String, String> reissue(String refreshToken) {
        String username = getCurrentUsername(refreshToken);
        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username).orElseThrow(NoSuchElementException::new);

        if (refreshToken.equals(redisRefreshToken.getRefreshToken())) {
            return reissueRefreshToken(refreshToken, username);
        }

        throw new IllegalArgumentException("토큰이 일치하지 않습니다.");
    }

    /**
     * 토큰에서 아이디 추출
     * @param token : Access 토큰
     * @return String : 아이디
     */
    private String getCurrentUsername(String token) {
        return jwtTokenUtil.extractAllClaims(token).get("id", String.class);
    }

    /**
     * Refresh 토큰 재발급
     * Refresh 토큰의 남은 유효기간이 JwtExpirationEnums.REISSUE_EXPIRATION_TIME 보다 작은 경우 Access 토큰만 재발급
     * @param refreshToken : JWT 토큰
     * @param username : 아이디
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
    private Map<String, String> reissueRefreshToken(String refreshToken, String username) {
        Map<String, String> token = new HashMap<>();

        if (lessThanReissueExpirationTimesLeft(refreshToken)) {
            String accessToken = jwtTokenUtil.generateAccessToken(username);
            token.put("accessToken", accessToken);
            token.put("refreshToken", saveRefreshToken(username).getRefreshToken());
            return token;
        }
        token.put("accessToken", jwtTokenUtil.generateAccessToken(username));
        token.put("refreshToken", refreshToken);
        return token;
    }

    private RefreshToken saveRefreshToken(String email) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(email,
                jwtUtil.generateRefreshToken(email), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

    /**
     * Refresh 토큰의 남은 유효기간이 JwtExpirationEnums.REISSUE_EXPIRATION_TIME보다 작은지 확인
     * @param refreshToken : JWT 토큰
     * @return boolean : 비교 결과
     */
    private boolean lessThanReissueExpirationTimesLeft(String refreshToken) {
        return jwtTokenUtil.getRemainMilliSeconds(refreshToken) < JwtExpirationEnums.REISSUE_EXPIRATION_TIME.getValue();
    }

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
