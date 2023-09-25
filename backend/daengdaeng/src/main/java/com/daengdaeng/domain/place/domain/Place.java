package com.daengdaeng.domain.place.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.daengdaeng.domain.category.domain.Category;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Place {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int placeId;

	@Column(nullable = false)
	private String title;

	private String jibunAddress;

	private String roadAddress;

	@Column(columnDefinition = "TEXT")
	private String openingHour;

	private String phoneNumber;

	@Column(columnDefinition = "TEXT")
	private String homepage;

	@Column(columnDefinition = "TEXT")
	private String content;

	@Column(length = 2048)
	private String image;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;



}
