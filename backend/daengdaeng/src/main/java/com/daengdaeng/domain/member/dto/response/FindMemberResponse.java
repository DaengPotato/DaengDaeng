package com.daengdaeng.domain.member.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindMemberResponse {

    String nickname;

    String email;

}
