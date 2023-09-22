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

    private final JwtEntryPoint jwtEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailService customUserDetailService;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable();


        // url 별 권한 관리 설정
        http.authorizeRequests()
                .mvcMatchers("/","/place/recommend/dog", "/place/recommend/member", "/member/login/*", "/member/nicknameCheck/*", "/swagger-resources/**", "/swagger-ui/**", "/v3/api-docs", "/swagger-ui/index.html").permitAll()
                .anyRequest().authenticated();

        // 예외 처리 설정
        http.exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint);

        http.logout().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService);
    }

}