package com.daengdaeng.domain.place.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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

	@Column(nullable = false)
	private String jibunAddress;

	@Column(nullable = false)
	private String roadAddress;

	@Column(nullable = false)
	private String openingHour;

	@Column(nullable = false)
	private String phoneNumber;

	@Column(nullable = false)
	private String homepage;

	@Column(nullable = false)
	private String content;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id")
	private Category category;

	@Builder
	public Place(String title, String jibunAddress, String roadAddress, String openingHour, String phoneNumber,
		String homepage, String content, Category category) {
		this.title = title;
		this.jibunAddress = jibunAddress;
		this.roadAddress = roadAddress;
		this.openingHour = openingHour;
		this.phoneNumber = phoneNumber;
		this.homepage = homepage;
		this.content = content;
		this.category = category;
	}

}
