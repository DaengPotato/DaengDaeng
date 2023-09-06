package com.daengdaeng.domain.place.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashTag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int hashtagId;

	@Column(length = 255, unique = true, nullable = false)
	private String hashtag;

	@Builder
	public HashTag(String hashtag) {
		this.hashtag = hashtag;
	}

}
