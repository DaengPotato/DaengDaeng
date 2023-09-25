package com.daengdaeng.domain.review.api;

import com.daengdaeng.domain.review.dto.request.ReviewRequest;
import com.daengdaeng.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/review/{placeId}")
    public ResponseEntity<Void> addReview(@RequestBody ReviewRequest reviewRequest,
                                          @PathVariable int placeId){
        reviewService.addReview(reviewRequest, placeId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/review/{reviewId}")
    public ResponseEntity<Void> modifyReview(@RequestBody ReviewRequest reviewRequest,
                                             @PathVariable int reviewId){
        reviewService.modifyReview(reviewRequest, reviewId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("review/{reviewId}")
    public ResponseEntity<Void> removeReview(@PathVariable int reviewId){
        reviewService.removeReview(reviewId);
        return ResponseEntity.ok().build();
    }

}
