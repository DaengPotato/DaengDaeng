package com.daengdaeng.domain.photo.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class FrameListResponse {

    List<FrameResponse> frameList;

    public static FrameListResponse of(List<FrameResponse> frameList){
        return FrameListResponse.builder()
                .frameList(frameList)
                .build();
    }

}
