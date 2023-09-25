package com.daengdaeng.domain.review.dto.response;

import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.review.domain.Review;
import lombok.Getter;

import java.util.List;

@Getter
public class ReviewResponse {

    private byte score;

    private String reviewContent;

    private Place place;

    public ReviewResponse from(Review review){
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.score = review.getScore();
        reviewResponse.reviewContent = review.getReviewContent();
        reviewResponse.place = review.getPlace();

        return reviewResponse;
    }

}
