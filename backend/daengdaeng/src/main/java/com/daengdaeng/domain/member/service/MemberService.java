package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.dto.response.FindMemberResponse;

import java.util.Map;

public interface MemberService {

    /**
     * Access 토큰 재발행
     * @param refreshToken : JWT 토큰
     * @return TokenDto : Access 토큰, Refresh 토큰을 저장하는 DTO
     */
    Map<String, String> reissue(String refreshToken);

    FindMemberResponse findMember();

    boolean nicknameCheck(String nickname);

    void modifyNickname(String nickname);

    void logout(String accessToken, String email);

    void removeMember(String accessToken, String email);

}
