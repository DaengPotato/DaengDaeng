package com.daengdaeng.domain.review.api;

import com.daengdaeng.domain.review.dto.request.ReviewRequest;
import com.daengdaeng.domain.review.dto.response.ReviewDetailResponse;
import com.daengdaeng.domain.review.dto.response.ReviewResponse;
import com.daengdaeng.domain.review.service.ReviewService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
@ApiResponses({
        @ApiResponse(code = 500, message = "서버 연결 오류", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 500, \n message: 서버 연결 오류 \n}")))
})
public class ReviewController {

    private final ReviewService reviewService;

    @ApiOperation(value = "리뷰 등록", notes = "리뷰 등록하는 API")
    @ApiResponses({
            @ApiResponse(code = 201, message = "리뷰 추가 성공", response = HttpStatus.class),
            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
            @ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: fail \n}"))),
            @ApiResponse(code = 404, message = "대상 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: fail \n}")))
    })
    @PostMapping("/{placeId}")
    public ResponseEntity<Void> addReview(@RequestBody ReviewRequest reviewRequest,
                                          @PathVariable int placeId){
        reviewService.addReview(reviewRequest, placeId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @ApiOperation(value = "리뷰 수정", notes = "리뷰 수정하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "리뷰 수정 성공", response = HttpStatus.class),
            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
            @ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: fail \n}"))),
            @ApiResponse(code = 404, message = "대상 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: fail \n}")))
    })
    @PatchMapping("/{reviewId}")
    public ResponseEntity<Void> modifyReview(@RequestBody ReviewRequest reviewRequest,
                                             @PathVariable int reviewId){
        reviewService.modifyReview(reviewRequest, reviewId);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "리뷰 삭제", notes = "리뷰 삭제하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "리뷰 삭제 성공", response = HttpStatus.class),
            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
            @ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: fail \n}"))),
            @ApiResponse(code = 404, message = "대상 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: fail \n}")))
    })
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> removeReview(@PathVariable int reviewId){
        reviewService.removeReview(reviewId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/list")
    public ResponseEntity<List<ReviewResponse>> findReviewList(){
        return ResponseEntity.ok().body(reviewService.findReviewList());
    }


    @GetMapping("/{placeId}")
    public ResponseEntity<ReviewDetailResponse> findReviewDetail(@PathVariable int placeId){
        return ResponseEntity.ok().body(reviewService.reviewDetail(placeId));
    }


}
