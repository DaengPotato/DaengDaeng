package com.daengdaeng.domain.place.dto.response;import java.util.List;import lombok.AllArgsConstructor;import lombok.Data;import lombok.Getter;import lombok.ToString;@AllArgsConstructor@Getterpublic class FindAllPlaceResponse {	private List<FindPlaceResponse> placeList;	private int nextCursor;}