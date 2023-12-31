package com.daengdaeng.domain.review.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Embeddable
public class ReviewKeywordId implements Serializable {

	@Column(name = "review_id")
	private int reviewId;

	@Column(name = "keyword_id")
	private int keywordId;

}
