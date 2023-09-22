package com.daengdaeng.domain.place.dto.response;
import com.daengdaeng.domain.place.domain.Image;
import com.daengdaeng.domain.place.domain.Place;

import lombok.Getter;

import java.util.List;

@Getter
public class MemberRecommendResponse {

    private int placeId;

    private String title;

    private String jibunAddress;

    private String roadAddress;

    private String openingHour;

    private String phoneNumber;

    private String homepage;

    private List<Image> imageList;

    public static MemberRecommendResponse from (Place place) {
        MemberRecommendResponse memberRecommendResponse = new MemberRecommendResponse();
        memberRecommendResponse.placeId = place.getPlaceId();
        memberRecommendResponse.title = place.getTitle();
        memberRecommendResponse.jibunAddress = place.getJibunAddress();
        memberRecommendResponse.roadAddress = place.getRoadAddress();
        memberRecommendResponse.openingHour = place.getOpeningHour();
        memberRecommendResponse.phoneNumber = place.getPhoneNumber();
        memberRecommendResponse.homepage = place.getHomepage();
        memberRecommendResponse.imageList = place.getImages();

        return memberRecommendResponse;
    }

}
