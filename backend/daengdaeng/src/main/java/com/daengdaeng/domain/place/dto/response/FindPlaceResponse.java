package com.daengdaeng.domain.place.dto.response;import java.util.List;import com.fasterxml.jackson.annotation.JsonProperty;import lombok.AllArgsConstructor;import lombok.Data;@AllArgsConstructorpublic class FindPlaceResponse {	private int placeId;	private String title;	private String jibunAddress;	private String roadeAddress;	private List<String> homepage;	private List<String> openingHour;	private String phoneNumber;	private String content;	//	private List<String> hashtag;	private int heartCnt;	private String placeImage;	private String category;	private Boolean isHeart;}