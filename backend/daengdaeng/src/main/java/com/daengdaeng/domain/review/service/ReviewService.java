package com.daengdaeng.domain.review.service;

import com.daengdaeng.domain.review.dto.request.ReviewRequest;
import com.daengdaeng.domain.review.dto.response.ReviewDetailResponse;
import com.daengdaeng.domain.review.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {

    void addReview(ReviewRequest reviewRequest, int placeId);

    void modifyReview(ReviewRequest reviewRequest, int reviewId);

    void removeReview(int reviewId);

    List<ReviewResponse> findReviewList();

    ReviewDetailResponse reviewDetail(int placeId);

}
