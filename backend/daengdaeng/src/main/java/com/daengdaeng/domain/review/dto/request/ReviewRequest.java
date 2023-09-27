package com.daengdaeng.domain.review.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ReviewRequest {

    private List<Integer> petList;
    private List<Integer> keywordList;
    private byte score;
    private String reviewContent;

    public static ReviewRequest reviewRequest(List<Integer> petList, byte score, List<Integer> keywordList, String reviewContent){
        ReviewRequest reviewRequest = new ReviewRequest();

        reviewRequest.petList = petList;
        reviewRequest.score = score;
        reviewRequest.keywordList = keywordList;
        reviewRequest.reviewContent = reviewContent;

        return reviewRequest;
    }

}
