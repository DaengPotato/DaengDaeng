package com.daengdaeng.domain.place.api;

import com.daengdaeng.domain.place.dto.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.service.PlaceService;
import com.daengdaeng.domain.place.service.RecommendService;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;
    private final RecommendService recommendService; // 테스트용

    @GetMapping("/test")
    public String test() {
        return recommendService.getDataFromFlask();
    }


    @GetMapping("/get_pet_recomm/{memberId}")
    public ResponseEntity<List<FindPlaceByDogResponse>> getPetRecomm(@PathVariable int memberId) {
//        System.out.print("왜 안돼 ");
//        System.out.print(memberId);
//        List<FindPlaceByDogResponse> result = placeService.findPlacesByPlaceIds(memberId);
//        System.out.println(result.toString());
//        return recommendService.getPetRecommend(memberId);
        return ResponseEntity.ok(placeService.findPlacesByPlaceIds(memberId));

    }

}


