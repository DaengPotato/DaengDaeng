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
	@Column(nullable = false)
	private int score;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "place_id")
	private Place place;

	@Builder
	public Review(int score, Member member, Place place) {
		this.score = score;
		this.member = member;
		this.place = place;
	}

}
