package com.daengdaeng.domain.place.api;

import com.daengdaeng.domain.place.service.RecommendService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class PlaceController {

    private final RecommendService recommendService;

    @GetMapping("/test")
    public String test() {
        return recommendService.getDataFromFlask();
    }

}

