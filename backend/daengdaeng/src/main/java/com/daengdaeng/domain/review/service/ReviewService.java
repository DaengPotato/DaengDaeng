package com.daengdaeng.domain.review.service;

import com.daengdaeng.domain.review.dto.request.ReviewRequest;

public interface ReviewService {

    void addReview(ReviewRequest reviewRequest, int placeId);

    void modifyReview(ReviewRequest reviewRequest, int reviewId);

    void removeReview(int reviewId);

}
