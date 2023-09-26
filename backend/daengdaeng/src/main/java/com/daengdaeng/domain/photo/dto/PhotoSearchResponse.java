package com.daengdaeng.domain.photo.dto;

import lombok.*;

import java.util.List;
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class PhotoSearchResponse {
    List<PhotoResponse> photoList;

    int nextCursor;

    public static PhotoSearchResponse of(List<PhotoResponse>photoList, int nextCursor){
        return PhotoSearchResponse.builder()
                .photoList(photoList)
                .nextCursor(nextCursor)
                .build();
    }
}
