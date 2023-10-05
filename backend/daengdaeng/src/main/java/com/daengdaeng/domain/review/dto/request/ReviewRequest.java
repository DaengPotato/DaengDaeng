package com.daengdaeng.domain.review.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ReviewRequest {

    private List<Integer> petList;
    private List<Integer> keywordList;
    private byte score;


    public static ReviewRequest reviewRequest(List<Integer> petList, byte score, List<Integer> keywordList){
        ReviewRequest reviewRequest = new ReviewRequest();

        reviewRequest.petList = petList;
        reviewRequest.score = score;
        reviewRequest.keywordList = keywordList;


        return reviewRequest;
    }

}
