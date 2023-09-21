package com.daengdaeng.domain.place.api;

import com.daengdaeng.domain.place.service.RecommendService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

@RestController
@RequiredArgsConstructor
public class PlaceController {

    private final RecommendService recommendService;

    @GetMapping("/test")
    public String test() {
        return recommendService.getDataFromFlask();
    }


    @GetMapping("/get_pet_recomm/{memberid}")
    public String getPetRecomm(@PathVariable int memberId){
        System.out.print("왜 안돼 ");
        return recommendService.getPetRecommend(memberId);
    }

}





}

