package com.daengdaeng.domain.place.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Embeddable
public class PlaceHashtagId implements Serializable {

	@Column(name = "hashtag_id")
	private int hashtagId;

	@Column(name = "place_id")
	private int placeId;

}
