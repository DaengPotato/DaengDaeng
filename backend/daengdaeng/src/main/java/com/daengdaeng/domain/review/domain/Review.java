package com.daengdaeng.domain.review.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.daengdaeng.domain.member.domain.Member;
import org.hibernate.annotations.ColumnDefault;

import com.daengdaeng.domain.place.domain.Place;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "member_id" , nullable = false)
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "place_id", nullable = false)
	private Place place;

	@Column(columnDefinition = "TEXT")
	private String comment;

	@Builder
	public Review(byte score, Member member, Place place) {
		this.score = score;
		this.member = member;
		this.place = place;
	}

}
