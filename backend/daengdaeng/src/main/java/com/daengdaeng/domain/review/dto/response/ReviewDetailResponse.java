package com.daengdaeng.domain.review.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ReviewDetailResponse {
    private List<PetInfoResponse> dogList;

    private int score;

    private List<ReviewKeywordResponse> reviewKeywordResponseList;

}
