package com.daengdaeng.domain.place.api;

import com.daengdaeng.domain.category.service.CategoryService;
import com.daengdaeng.domain.place.dto.response.FindAllPlaceResponse;
import com.daengdaeng.domain.place.dto.response.FindCategoryResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceDetailResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;
import com.daengdaeng.domain.place.service.FlaskPlaceService;
import com.daengdaeng.domain.place.service.PlaceService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Example;
import io.swagger.annotations.ExampleProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "여행지 API", description = "여행지 관련 API (PlaceController)")
@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
@ApiResponses({
	@ApiResponse(code = 500, message = "서버 연결 오류", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 500, \n message: 서버 연결 오류 \n}")))
})
public class PlaceController {

	private final FlaskPlaceService flaskPlaceService;
	private final PlaceService placeService;
	private final CategoryService categoryService;


	@ApiOperation(value = "여행지 목록 조회", notes = "반려동물 목록을 조회/검색하는 API")
	@ApiResponses({
		@ApiResponse(code = 200, message = "장소 리스트 조회 성공"),
		@ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}")))
	})
	@GetMapping
	public ResponseEntity<FindAllPlaceResponse> getAllPlace(Byte category, String keyword, int cursor) {
		return ResponseEntity.ok().body(placeService.placeList(category, keyword, cursor));
	}

	@ApiOperation(value = "여행지 상세 조회", notes = "선택한 여행지의 상세 정보를 조회하는 API")
	@ApiResponses({
		@ApiResponse(code = 200, message = "여행지 상세 조회 성공"),
		@ApiResponse(code = 403, message = "로그인 만료/비로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: expired \n}"))),
		@ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))
	})
	@GetMapping("/{placeId}")
	public ResponseEntity<FindPlaceDetailResponse> getDetailPlace(@PathVariable int placeId) {
		return ResponseEntity.ok().body(placeService.placeDetail(placeId));
	}

	@ApiOperation(value = "카테고리 정보 조회", notes = "카테고리 정보를 조회하는 API")
	@ApiResponses({
		@ApiResponse(code = 200, message = "카테고리 상세 조회 성공"),
	})
	@GetMapping("/category")
	public ResponseEntity<List<FindCategoryResponse>> getCategory() {
		return ResponseEntity.ok().body(categoryService.getCategory());
	}



	@GetMapping("/recommend/dog")
	public ResponseEntity<List<FindPlaceByDogResponse>> getRecommendPlaceByPet() {

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
