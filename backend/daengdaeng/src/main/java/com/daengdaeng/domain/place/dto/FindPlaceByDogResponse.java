package com.daengdaeng.domain.place.dto;

import com.daengdaeng.domain.pet.domain.Pet;
import com.daengdaeng.domain.place.domain.Place;
import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FindPlaceByDogResponse {
    private int petId;

    private String name;

    List <PlaceResponse> placeList;

    public static FindPlaceByDogResponse of(int petId, List<PlaceResponse> placeList){
        return FindPlaceByDogResponse.builder()
                .petId(petId)
                .name("강아지")
                .placeList(placeList)
                .build();
    }

}
