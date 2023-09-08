package com.daengdaeng.domain.category.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.daengdaeng.domain.place.domain.Place;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int categoryId;

	@Column(length = 20, unique = true, nullable = false)
	private String category;

}
