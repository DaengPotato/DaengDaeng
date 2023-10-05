package com.daengdaeng.domain.review.domain;

import javax.persistence.*;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.review.dto.request.ReviewRequest;
import org.hibernate.annotations.ColumnDefault;

import com.daengdaeng.domain.place.domain.Place;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewId;

	@ColumnDefault("5")
	@Column(nullable = false, columnDefinition = "TINYINT(3) UNSIGNED")
	private byte score;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id" , nullable = false)
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "place_id", nullable = false)
	private Place place;

	private String reviewContent;

	@Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date registTime;


	@Builder
	public Review(byte score, Member member, Place place, Date registTime) {
		this.score = score;
		this.member = member;
		this.place = place;
		this.registTime = registTime;
	}

	// 리뷰 수정
	public void modifyReview(ReviewRequest reviewRequest){
		this.score = reviewRequest.getScore();
	}
}
