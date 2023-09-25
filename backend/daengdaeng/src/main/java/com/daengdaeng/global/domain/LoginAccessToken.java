package com.daengdaeng.global.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.Id;

@Getter
@RedisHash("LoginAccessToken")
@AllArgsConstructor
@Builder
public class LoginAccessToken {
    @Id
    private String id;

    private String loginAccessToken;

    @TimeToLive
    private Long expiration;

    public static LoginAccessToken createLoginAccessToken(String email, String loginAccessToken, Long remainingMilliSeconds) {
        return LoginAccessToken.builder()
                .id(email)
                .loginAccessToken(loginAccessToken)
                .expiration(remainingMilliSeconds / 1000)
                .build();
    }

}
