package com.daengdaeng.domain.place.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daengdaeng.domain.place.service.PlaceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("api/place")
public class PlaceController {

	private final PlaceService placeService;

	@GetMapping("/")
	public ResponseEntity<String> getAllPlace(int category, String keyword, int page ) {
		//
		return new ResponseEntity<>(HttpStatus.OK);
	}


	@GetMapping("/recommend/dog")
	public ResponseEntity<String> getRecommendPlaceByPet() {
		int memberId = 1;
		// placeService


		return new ResponseEntity<>(HttpStatus.OK);
	}

}
