package com.daengdaeng.domain.review.dto.response;

import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.review.domain.Review;
import lombok.Getter;

@Getter
public class ReviewResponse {

    private int reviewId;
    private byte score;
    private Place place;

    public ReviewResponse from(Review review){
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.reviewId = review.getReviewId();
        reviewResponse.score = review.getScore();
        reviewResponse.place = review.getPlace();

        return reviewResponse;
    }

}
