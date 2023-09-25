package com.daengdaeng.domain.place.service;

import com.daengdaeng.domain.place.dto.response.FindAllPlaceResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceDetailResponse;

public interface PlaceService {

	FindAllPlaceResponse placeList(Byte category, String keyword, int cursor);

	FindPlaceDetailResponse placeDetail(int placeId);
}
