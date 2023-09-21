package com.daengdaeng.domain.place.api;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.response.MemberRecommendResponse;
import com.daengdaeng.domain.place.service.RecommendService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PlaceController {

    private final RecommendService recommendService;

    @GetMapping("/test")
    public String test() {
        return recommendService.getDataFromFlask();
    }


    // 반려견 추천
    @GetMapping("/get_pet_recomm/{memberId}")
    public List<Map<String, List<MemberRecommendResponse>>> getPetRecomm(@PathVariable("memberId") int memberId){

        return recommendService.getPetRecommend(memberId);
    }

    //사용자 찜&리뷰 기반 추천
    @GetMapping("/get_heart_recomm/{memberId}")
    public List<MemberRecommendResponse> getHashHeartRecomm(@PathVariable("memberId") int memberId){

        return recommendService.getHashHeartRecommend(memberId);
    }

}

