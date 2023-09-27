package com.daengdaeng.domain.member.api;


import com.daengdaeng.domain.member.dto.response.FindMemberResponse;
import com.daengdaeng.domain.member.service.MemberService;
import com.daengdaeng.domain.member.service.SocialService;
import com.daengdaeng.global.util.JwtTokenUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Api(tags = "멤버 API", description = "멤버 관련 API (MemberController)")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/member", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
@ApiResponses({
        @ApiResponse(code = 500, message = "서버 연결 오류", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 500, \n message: 서버 연결 오류 \n}")))
})
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
    @ApiOperation(value = "로그인/회원가입", notes = "로그인/회원가입 하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인/회원가입 성공"),
            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "code", value = "인가 코드", required = true, dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "login_type", value = "로그인 타입(KAKAO/GOOGLE)", required = true, dataType = "string", paramType = "path")
    })
    @PostMapping("/login/{login_type}")
    public ResponseEntity<String> login(@RequestParam String code, @PathVariable(name = "login_type") String loginType) {

        Map<String, String> token = socialService.login(code, loginType);

        log.info(token.get("accessToken"));
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
    @ApiOperation(value = "토큰 재발급", notes = "토큰 재발급 하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "토큰 재발급 성공"),
            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}")))
    })
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
    @ApiOperation(value = "닉네임 중복 검사", notes = "닉네임 중복 검사하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "닉네임 중복 검사 성공(true: 사용 가능, false: 사용 불가능)"),
            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
    })
    @ApiImplicitParam(name = "nickname", value = "닉네임", required = true, dataType = "string", paramType = "path")
    @GetMapping("/nicknameCheck/{nickname}")
    public ResponseEntity<Boolean> nicknameCheck(@PathVariable String nickname) {
        return ResponseEntity.ok(memberService.nicknameCheck(nickname));
    }

    /**
     * 닉네임 변경
     * @param nickname: 닉네임
     */
    @ApiOperation(value = "닉네임 변경", notes = "닉네임 변경하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "닉네임 변경 성공"),
            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
            @ApiResponse(code = 403, message = "로그인 만료/비로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: expired \n}"))),
            @ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))
    })
    @ApiImplicitParam(name = "nickname", value = "닉네임", required = true, dataType = "string", paramType = "query")
    @PatchMapping("/modifyNickname")
    public ResponseEntity<Void> modifyNickname(@RequestParam String nickname) {
        memberService.modifyNickname(nickname);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "로그아웃", notes = "로그아웃 하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그아웃 성공"),
            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
    })
    @ApiImplicitParam(name = "Authorization", value = "액세스 토큰", required = true, dataType = "string", paramType = "header")
    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String accessToken) {
        accessToken = resolveToken(accessToken);
        String email = jwtTokenUtil.getUsername(accessToken);
        socialService.logout(email);
        memberService.logout(accessToken, email);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴 하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 탈퇴 성공"),
            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
    })
    @ApiImplicitParam(name = "Authorization", value = "액세스 토큰", required = true, dataType = "string", paramType = "header")
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
