package com.daengdaeng.domain.place.api;

import com.daengdaeng.domain.place.service.RecommendService;

import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

@RestController
@RequiredArgsConstructor
public class PlaceController {

    private final RecommendService recommendService;
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/test")
    public String test() {
        ;
        log.trace("test");
        return recommendService.getDataFromFlask();
    }


//  반려견 추천
    @GetMapping("/get_pet_recomm/{memberid}")
    public String getPetRecomm(@PathVariable int memberId){
        System.out.print("왜 안돼 ");
        return recommendService.getPetRecommend(memberId);
    }




}

