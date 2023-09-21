package com.daengdaeng.domain.member.api;


import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final SocialService socialService;

    @Value("${jwt.cookieName}")
    private String jwtCookieName;

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

}
