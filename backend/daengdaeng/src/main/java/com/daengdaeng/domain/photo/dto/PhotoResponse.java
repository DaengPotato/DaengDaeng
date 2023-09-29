package com.daengdaeng.domain.photo.dto;

import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoResponse {

    String image;

    String place;

    public static PhotoResponse of(String image, String place){
        return PhotoResponse.builder()
                .image(image)
                .place(place)
                .build();
    }

}
