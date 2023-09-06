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

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Facility {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int facilityId;

	@Column(nullable = false)
	private String facilityName;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "place_id")
	private Place place;

	@Builder
	public Facility(String facilityName, Place place) {
		this.facilityName = facilityName;
		this.place = place;
	}

}
