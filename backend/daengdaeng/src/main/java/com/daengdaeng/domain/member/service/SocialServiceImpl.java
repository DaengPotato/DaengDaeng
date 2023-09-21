package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.domain.LoginType;
import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.global.domain.RefreshToken;
import com.daengdaeng.global.domain.RefreshTokenRedisRepository;
import com.daengdaeng.global.jwt.JwtExpirationEnums;
import com.daengdaeng.global.util.JwtTokenUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SocialServiceImpl implements SocialService {
    private final String KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private final String KAKAO_USERINFO_URL = "https://kapi.kakao.com/v2/user/me" ;
    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private final String GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

    @Value("${kakao.rest-api-key}")
    private String kakaoApiKey;

    @Value("${kakao.redirect-uri}")
    private String kakaoRedirectUri;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    private final MemberRepository memberRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private JwtTokenUtil jwtUtil;

    @Override
    public Map<String, String> login(String code, String loginType) {
        Map<String, String> token = new HashMap<>();

        // 소셜 서버에서 전달 받은 인가 코드 (Authorization code)
        // 소셜 이름 (kakao 혹은 google)
        String accessToken = "";
        String email = null;
        String jwtToken = "";

        if (loginType.equals("kakao")) {
            // 코드 to 액세스 토큰
            accessToken = getKakaoAccessToken(code);
            System.out.println("access token: " + accessToken);

            // 액세스 토큰 to 회원 정보
            email = getKakaoMemberInfo(accessToken);
            if (email == null) {
                throw new IllegalArgumentException("로그인 처리 중 에러 발생");
            }
            System.out.println("kakaoMemberInfo: " + email);

            // 회원 정보 to JWT
            jwtToken = jwtUtil.generateAccessToken(email);
            System.out.println("jwtToken: " + jwtToken);

        } else if (loginType.equals("google")) {
            accessToken = getGoogleAccessToken(code);
            email = getGoogleMemberInfo(accessToken);
            if (email == null) {
                throw new IllegalArgumentException("로그인 처리 중 에러 발생");
            }
            jwtToken = jwtUtil.generateAccessToken(email);
        }

        RefreshToken refreshToken = saveRefreshToken(email);

        token.put("accessToken", accessToken);
        token.put("refreshToken", refreshToken.getRefreshToken());

        return token;
    }

    private RefreshToken saveRefreshToken(String email) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(email,
                jwtUtil.generateRefreshToken(email), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

    private String getKakaoAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoApiKey);
        params.add("redirect_uri", kakaoRedirectUri);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                KAKAO_TOKEN_URL,
                HttpMethod.POST,
                kakaoTokenRequest,
                Map.class
        );

        String accessToken = (String) response.getBody().get("access_token");
        return accessToken;
    }

    private String getKakaoMemberInfo(String token) {

        WebClient webClient = WebClient.create(KAKAO_USERINFO_URL);
        String response = webClient.get()
                .uri(KAKAO_USERINFO_URL)
                .header("Authorization", "Bearer " + token)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(String.class)
                .block();

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(response);


        JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");

        Member kakaoMember = Member.builder()
                .email(kakaoAccount.getAsJsonObject().get("email").getAsString())
                .loginType(LoginType.KAKAO)
                .build();

        Optional<Member> member = memberRepository.findByEmail(kakaoMember.getEmail());
        if (member.isEmpty()) {
            memberRepository.save(kakaoMember);
        }

        return kakaoMember.getEmail();
    }

    private String getGoogleAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(clientId, clientSecret);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("code", code);
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("redirect_uri", redirectUri); // OAuth2 리다이렉트 URL

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                GOOGLE_TOKEN_URL,
                HttpMethod.POST,
                request,
                Map.class
        );
        System.out.println(response.getBody().toString());
        String accessToken = (String) response.getBody().get("access_token");
        return accessToken;
    }

    private String getGoogleMemberInfo(String token) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                UriComponentsBuilder.fromUriString(GOOGLE_USERINFO_URL).toUriString(),
                HttpMethod.GET,
                request,
                Map.class
        );

        System.out.println(response.getBody().toString());

        Member googleMember = Member.builder()
                .email(response.getBody().get("email").toString())
                .loginType(LoginType.GOOGLE)
                .build();

        Optional<Member> member = memberRepository.findByEmail(googleMember.getEmail());
        if (member.isEmpty()) {
            memberRepository.save(googleMember);
        }

        return googleMember.getEmail();
    }
}
