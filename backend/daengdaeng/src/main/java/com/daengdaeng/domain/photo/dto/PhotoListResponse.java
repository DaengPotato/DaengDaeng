package com.daengdaeng.domain.photo.dto;

import lombok.*;

import java.util.List;
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class PhotoListResponse {
    List<PhotoResponse> photoList;

    int nextCursor;
}
