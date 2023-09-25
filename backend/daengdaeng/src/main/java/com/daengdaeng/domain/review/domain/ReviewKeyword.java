package com.daengdaeng.domain.review.domain;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.daengdaeng.domain.review.dto.request.ReviewRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewKeyword {

	@EmbeddedId
	private ReviewKeywordId reviewKeywordId;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "review_id", insertable = false, updatable = false, nullable = false)
	private Review review;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "keyword_id", insertable = false, updatable = false, nullable = false)
	private Keyword keyword;

	@Builder
	public ReviewKeyword(Review review, Keyword keyword) {
		this.review = review;
		this.keyword = keyword;
	}

	// 리뷰키워드 수정
	public void modifyKeyword(Keyword keyword){
		this.keyword = keyword;
	}
}
