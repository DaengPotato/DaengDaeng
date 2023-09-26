package com.daengdaeng.domain.photo.dto;

import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class FrameResponse {
    String frameName;
    String frameUrl;

    public static FrameResponse of(String frameName,String frameUrl){
        return FrameResponse.builder()
                .frameName(frameName)
                .frameUrl(frameUrl)
                .build();
    }
}
