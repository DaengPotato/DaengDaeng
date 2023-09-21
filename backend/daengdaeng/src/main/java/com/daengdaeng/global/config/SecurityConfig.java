package com.daengdaeng.global.config;

import com.daengdaeng.global.jwt.JwtAuthenticationFilter;
import com.daengdaeng.global.jwt.JwtEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // JWT 인증 실패 시 실행
    private final JwtEntryPoint jwtEntryPoint;
    // JWT 토큰을 처리할 필터
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    // 사용자 정보 로드 서비스
    private final CustomUserDetailService customUserDetailService;
    private final CustomOAuth2UserService customOAuth2UserService;


    // AuthenticationManager Bean 생성
    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManagerBean();
    }

    // HttpSecurity 설정 (인증, 권한, JWT 필터 등 다양한 보안 설정)
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()

                .and()

                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .defaultSuccessUrl("/loginSuccess")
                .failureUrl("/loginFailure")
                .and()

                .csrf().disable()
                .authorizeRequests() // 5
                .antMatchers("/", "/member/login/*", "/member/nicknameCheck/*", "/swagger-resources/**", "/swagger-ui/**", "/v3/api-docs", "/swagger-ui/index.html").permitAll()
                .anyRequest().hasRole("USER")

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint)

                .and()
                .logout().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;
    }

    // AuthenticationManagerBuilder를 설정 (사용자 세부 서비스)
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService);
    }

}