package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;

import java.util.List;

public interface HeartService {

    void addHeart(int placeId);

    void removeHeart(int placeId);

    List<FindPlaceResponse> findHeart();

}
