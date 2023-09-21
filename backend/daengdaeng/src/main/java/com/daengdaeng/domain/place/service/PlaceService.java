package com.daengdaeng.domain.place.service;

import java.util.List;

import com.daengdaeng.domain.place.dto.response.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;

public interface PlaceService {

	List<FindPlaceByDogResponse> recommendPlaceByPet();

	List<FindPlaceResponse> recommendPlaceByMember();

}
