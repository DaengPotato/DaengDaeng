package com.daengdaeng.domain.s3file.dto;

import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UrlResponse {

    private String uploadUrl;

}
