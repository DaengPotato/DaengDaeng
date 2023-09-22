package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.dto.response.FindMemberResponse;

public interface MemberService {

    FindMemberResponse findMember();

    boolean nicknameCheck(String nickname);

    void modifyNickname(String nickname);

}
