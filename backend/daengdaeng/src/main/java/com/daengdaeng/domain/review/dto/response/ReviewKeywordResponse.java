package com.daengdaeng.domain.review.dto.response;

import com.daengdaeng.domain.review.domain.Keyword;
import lombok.Getter;

@Getter
public class ReviewKeywordResponse {
    private int keywordId;
    private String keyword;
    public ReviewKeywordResponse from(Keyword keyword){
        ReviewKeywordResponse reviewKeywordResponse = new ReviewKeywordResponse();
        reviewKeywordResponse.keywordId = keyword.getKeywordId();
        reviewKeywordResponse.keyword = keyword.getKeyword();

        return reviewKeywordResponse;
    }
}
