package com.daengdaeng.domain.place.domain;

import javax.persistence.*;

import com.daengdaeng.domain.category.domain.Category;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;

	@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Image> images = new ArrayList<>();


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

	public List<Image> getImages() {
		return images;
	}
}
