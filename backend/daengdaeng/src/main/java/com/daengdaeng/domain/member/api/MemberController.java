package com.daengdaeng.domain.member.api;


import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.service.MemberService;
import com.daengdaeng.domain.member.service.SocialService;
import com.daengdaeng.global.util.JwtTokenUtil;
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
    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;

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

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String accessToken) {
        String email = jwtTokenUtil.getUsername(accessToken);
        memberService.logout(accessToken, email);
        socialService.logout(email);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> removeMember(@RequestHeader("Authorization") String accessToken) {
        String email = jwtTokenUtil.getUsername(accessToken);
        memberService.removeMember(accessToken, email);
        socialService.removeMember(email);
        return ResponseEntity.ok().build();
    }

}
