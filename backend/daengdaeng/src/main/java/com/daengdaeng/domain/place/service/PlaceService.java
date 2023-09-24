package com.daengdaeng.domain.place.service;

import com.daengdaeng.domain.place.dto.response.FindAllPlaceResponse;

public interface PlaceService {

	FindAllPlaceResponse placeList(Byte category, String keyword, int cursor);
}
