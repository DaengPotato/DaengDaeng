package com.daengdaeng.domain.place.dto;

import com.daengdaeng.domain.place.domain.Hashtag;
import com.daengdaeng.domain.place.domain.Place;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaceResponse {
    private int placeId;

    @NotBlank
    private String title;

    private String jibunAddress;

    private String roadAddress;

    private String homepage; // TODO: 리스트?

    private String openingHour; // TODO: 리스트?

    private String phoneNumber;

    private String content;

    private List<HashtagResponse> hashtags;

//    private int heartCnt;

    private String placeImage;

    @NotBlank
    private String category;
    private boolean isHeart;

    public static PlaceResponse of(Place place, List<HashtagResponse> hashtags){
        return PlaceResponse.builder()
                .placeId(place.getPlaceId())
                .title(place.getTitle())
                .jibunAddress(place.getJibunAddress())
                .roadAddress(place.getRoadAddress())
                .homepage(place.getHomepage())
                .openingHour(place.getOpeningHour())
                .phoneNumber(place.getPhoneNumber())
                .content(place.getContent())
                .hashtags(hashtags)
//                .heartCnt()
//                .placeImage()
                .build();
    }
}
