package com.daengdaeng.domain.member.api;


import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.service.MemberService;
import com.daengdaeng.domain.member.service.SocialService;
import com.daengdaeng.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
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
     * 토큰 재발급
     * @param request : Refresh 토큰 가져올 HttpServletRequest
     * @return TokenDto : Access 토큰, Refresh 토큰 저장 DTO
     * 200 : 토큰 재발급 성공
     * 500 : 서버 내 에러
     */
    @PostMapping("/reissue")
    public ResponseEntity<String> reissue(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        log.info("cookies : {}", cookies);

        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (jwtCookieName.equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        log.info("refreshToken : {}", refreshToken);

        Map<String, String> token = memberService.reissue(refreshToken);
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

    /**
     * 닉네임 변경
     * @param nickname: 닉네임
     */
    @PatchMapping("/modifyNickname")
    public ResponseEntity<Void> modifyNickname(@RequestParam String nickname) {
        memberService.modifyNickname(nickname);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String accessToken) {
        accessToken = resolveToken(accessToken);
        String email = jwtTokenUtil.getUsername(accessToken);
        socialService.logout(email);
        memberService.logout(accessToken, email);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> removeMember(@RequestHeader("Authorization") String accessToken) {
        accessToken = resolveToken(accessToken);
        String email = jwtTokenUtil.getUsername(accessToken);
        socialService.removeMember(email);
        memberService.removeMember(accessToken, email);
        return ResponseEntity.ok().build();
    }

    /**
     * 문자열에서 토큰 추출
     * @param accessToken
     * @return String : Bearer를 분리한 토큰 값
     */
    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }

}
