package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.domain.LoginType;
import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.global.domain.LoginAccessToken;
import com.daengdaeng.global.domain.LoginAccessTokenRedisRepository;
import com.daengdaeng.global.domain.RefreshToken;
import com.daengdaeng.global.domain.RefreshTokenRedisRepository;
import com.daengdaeng.global.jwt.JwtExpirationEnums;
import com.daengdaeng.global.util.JwtTokenUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class SocialServiceImpl implements SocialService {

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String KAKAO_TOKEN_URL;

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String KAKAO_USERINFO_URL;

    @Value("${spring.security.oauth2.client.provider.google.token-uri}")
    private String GOOGLE_TOKEN_URL;

    @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
    private String GOOGLE_USERINFO_URL;

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
    private final LoginAccessTokenRedisRepository loginAccessTokenRedisRepository;
    private final JwtTokenUtil jwtUtil;

    @Override
    public Map<String, String> login(String code, String loginType) {
        Map<String, String> token = new HashMap<>();

        // 소셜 서버에서 전달 받은 인가 코드 (Authorization code)
        // 소셜 이름 (kakao 혹은 google)
        String accessToken = null;
        String email = null;

        if (loginType.equals("KAKAO")) {
            // 코드 to 액세스 토큰
            accessToken = getKakaoAccessToken(code);
            System.out.println("access token: " + accessToken);

            // 액세스 토큰 to 회원 정보
            email = getKakaoMemberInfo(accessToken);
            if (email == null) {
                throw new IllegalArgumentException("로그인 처리 중 에러 발생");
            }
            System.out.println("kakaoMemberInfo: " + email);
        } else if (loginType.equals("GOOGLE")) {
            accessToken = getGoogleAccessToken(code);
            email = getGoogleMemberInfo(accessToken);
            if (email == null) {
                throw new IllegalArgumentException("로그인 처리 중 에러 발생");
            }
        }

        // 24시간 저장
        loginAccessTokenRedisRepository.save(LoginAccessToken.createLoginAccessToken(email, accessToken, 1000L * 60 * 60 * 24));

        // 회원 정보 to JWT
        String jwtToken = jwtUtil.generateAccessToken(email);

        RefreshToken refreshToken = saveRefreshToken(email);

        token.put("accessToken", jwtToken);
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
        JsonElement profile = kakaoAccount.getAsJsonObject().get("profile");

        String userEmail = kakaoAccount.getAsJsonObject().get("email").getAsString();

        Optional<Member> member = memberRepository.findByEmail(userEmail);
        if (member.isEmpty()) {
            Member kakaoMember = Member.builder()
                    .email(userEmail)
                    .nickname(profile.getAsJsonObject().get("nickname").getAsString())
                    .loginType(LoginType.KAKAO)
                    .build();
            memberRepository.save(kakaoMember);
        }

        return userEmail;
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

        String userEmail = response.getBody().get("email").toString();

        Optional<Member> member = memberRepository.findByEmail(userEmail);
        if (member.isEmpty()) {
            Member googleMember = Member.builder()
                    .email(userEmail)
                    .nickname(response.getBody().get("name").toString())
                    .loginType(LoginType.GOOGLE)
                    .build();
            memberRepository.save(googleMember);
        }

        return userEmail;
    }

    @Override
    public void logout(String email) {
        if (memberRepository.findByEmail(email).get().getLoginType().toString().equals("GOOGLE"))
            return;

        String url = "https://kapi.kakao.com/v1/user/logout";

        String token = loginAccessTokenRedisRepository.findById(email).get().getLoginAccessToken();

        WebClient webClient = WebClient.create(url);
        webClient.post()
                .uri(url)
                .header("Authorization", "Bearer " + token)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public void removeMember(String email) {
        String token = loginAccessTokenRedisRepository.findById(email).get().getLoginAccessToken();

        if (memberRepository.findByEmail(email).get().getLoginType().toString().equals("KAKAO")) {
            String url = "https://kapi.kakao.com/v1/user/unlink";
            WebClient webClient = WebClient.create(url);
            webClient.post()
                    .uri(url)
                    .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } else {
            String url = "https://oauth2.googleapis.com/revoke";
            WebClient webClient = WebClient.create(url);
            webClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("token", token)
                            .build())
                    .header("Content-type", "application/x-www-form-urlencoded")
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        }
    }

}
