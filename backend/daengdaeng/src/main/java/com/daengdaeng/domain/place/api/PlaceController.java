package com.daengdaeng.domain.place.api;

import com.daengdaeng.domain.place.dto.response.FindAllPlaceResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceDetailResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;
import com.daengdaeng.domain.place.service.FlaskPlaceService;
import com.daengdaeng.domain.place.service.PlaceService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceController {

	private final FlaskPlaceService flaskPlaceService;
	private final PlaceService placeService;


	@GetMapping("")
	public ResponseEntity<FindAllPlaceResponse> getAllPlace(Byte category, String keyword, int cursor) {
		FindAllPlaceResponse findAllPlaceResponse = placeService.placeList(category, keyword, cursor);
		return new ResponseEntity<>(findAllPlaceResponse,HttpStatus.OK);
	}

	@GetMapping("/{placeId}")
	public ResponseEntity<FindPlaceDetailResponse> getDetailPlace(@PathVariable int placeId) {

		FindPlaceDetailResponse findPlaceDetailResponse = placeService.placeDetail(placeId);

		return new ResponseEntity<>(findPlaceDetailResponse,HttpStatus.OK);
	}


	@GetMapping("/recommend/dog")
	public ResponseEntity<List<FindPlaceByDogResponse>> getRecommendPlaceByPet() {
		// String email = "1";

		List<FindPlaceByDogResponse> findPlaceByDogResponseList = flaskPlaceService.recommendPlaceByPet();

		return new ResponseEntity<>(findPlaceByDogResponseList,HttpStatus.OK);
	}

	@GetMapping("/recommend/member")
	public ResponseEntity<List<FindPlaceResponse>> getRecommendPlaceByMember() {
		// String email = "1";

		List<FindPlaceResponse> findPlaceResponseList = flaskPlaceService.recommendPlaceByMember();

		return new ResponseEntity<>(findPlaceResponseList,HttpStatus.OK);
	}


}
