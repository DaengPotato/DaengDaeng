package com.daengdaeng.common.dto;

import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UrlResponse {
    private String uploadUrl;
}
