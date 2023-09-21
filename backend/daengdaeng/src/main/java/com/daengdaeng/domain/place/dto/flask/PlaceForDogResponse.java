package com.daengdaeng.domain.place.dto.flask;

import lombok.Data;

import java.util.List;

@Data
public class PlaceForDogResponse {

    private int petId;

    private List<Integer> recommendPlaceList;

}
