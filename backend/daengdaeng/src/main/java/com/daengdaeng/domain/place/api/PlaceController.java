package com.daengdaeng.domain.place.api;

import java.util.List;

import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daengdaeng.domain.place.dto.response.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.service.FlaskPlaceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/place")
public class PlaceController {

	private final FlaskPlaceService flaskPlaceService;

	@GetMapping("/")
	public ResponseEntity<String> getAllPlace(int category, String keyword, int page ) {

		return new ResponseEntity<>(HttpStatus.OK);
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
