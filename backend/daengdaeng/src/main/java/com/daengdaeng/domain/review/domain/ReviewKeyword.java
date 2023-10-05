package com.daengdaeng.domain.review.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "review_id", insertable = false, updatable = false, nullable = false)
	private Review review;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "keyword_id", insertable = false, updatable = false, nullable = false)
	private Keyword keyword;

	@Builder
	public ReviewKeyword(ReviewKeywordId reviewKeywordId) {
		this.reviewKeywordId = reviewKeywordId;
	}

}


