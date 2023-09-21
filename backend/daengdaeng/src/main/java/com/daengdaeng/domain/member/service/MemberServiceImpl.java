package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

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

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 이메일 추출
     * @return String : 이메일
     */
    private String getCurrentEmail() {
        log.info("getCurrentEmail==========================================");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("getCurrentEmail==========================================2");
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        log.info("getCurrentEmail==========================================3");
        return principal.getUsername();
    }

}
