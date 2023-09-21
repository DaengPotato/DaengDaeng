package com.daengdaeng.domain.place.service;

import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.repository.PlaceRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PlaceService {
//    private final PlaceRespository placeRepository;

    public List<FindPlaceByDogResponse> findPlacesByPlaceIds(int memberId);

}
