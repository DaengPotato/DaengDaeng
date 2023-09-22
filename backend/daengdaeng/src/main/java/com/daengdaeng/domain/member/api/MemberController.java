package com.daengdaeng.domain.member.api;


import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.service.MemberService;
import com.daengdaeng.domain.member.service.SocialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {

    private final SocialService socialService;
    private final MemberService memberService;

    @Value("${jwt.cookieName}")
    private String jwtCookieName;

    /**
     * 회원 조회
     * @return FindMemberResponse: 회원 정보
     * - 본인 정보만 조회 가능
     */
    @GetMapping
    public ResponseEntity<FindMemberResponse> findMember() {
            return ResponseEntity.ok().body(memberService.findMember());
    }

    /**
     * 로그인/회원가입
     * @param code: 인가코드
     * @param loginType: 로그인 타입(카카오/구글)
     * @return accessToken
     * refreshToken은 cookie에 저장
     */
    @PostMapping("/login/{login_type}")
    public ResponseEntity<String> login(@RequestParam String code, @PathVariable(name = "login_type") String loginType) {

        Map<String, String> token = socialService.login(code, loginType);

        return ResponseEntity.ok()
                .header("Set-Cookie", jwtCookieName + "=" + token.get("refreshToken") + "; HttpOnly; Max-Age=" + 1000L * 60 * 60 * 24 + "; SameSite=None; Secure")
                .body(token.get("accessToken"));
    }

    /**
     * 닉네임 중복 검사
     * @param nickname : 닉네임
     * @return Boolean : 중복 여부
     */
    @GetMapping("/nicknameCheck/{nickname}")
    public ResponseEntity<Boolean> nicknameCheck(@PathVariable String nickname) {
        return ResponseEntity.ok(memberService.nicknameCheck(nickname));
    }

    @PatchMapping("/modifyNickname")
    public ResponseEntity<Void> modifyNickname(String nickname) {
        memberService.modifyNickname(nickname);
        return ResponseEntity.ok().build();
    }

}
