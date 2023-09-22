package com.daengdaeng.domain.place.api;

import org.springframework.stereotype.Controller;

@Controller
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
