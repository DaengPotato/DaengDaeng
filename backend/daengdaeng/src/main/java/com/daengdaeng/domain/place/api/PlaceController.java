package com.daengdaeng.domain.place.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/place")
public class PlaceController {

	@GetMapping("/")
	public ResponseEntity<String> getPlace(int category, String keyword, int page ) {
		//
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
