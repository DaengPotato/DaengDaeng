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
}
