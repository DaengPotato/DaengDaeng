package com.daengdaeng.domain.member.api;

import com.daengdaeng.domain.member.service.HeartService;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "찜 API", description = "찜 관련 API (HeartController)")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/member/heart", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
        @ApiResponse(code = 500, message = "서버 연결 오류", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 500, \n message: 서버 연결 오류 \n}")))
})
public class HeartController {

    private final HeartService heartService;

    @ApiOperation(value = "찜 추가", notes = "장소를 찜하는 API")
    @ApiResponses({
            @ApiResponse(code = 201, message = "찜 추가 성공", response = HttpStatus.class),
            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
            @ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))

    })
    @PostMapping("/{placeId}")
    public ResponseEntity<Void> addHeart(@PathVariable int placeId) {

        heartService.addHeart(placeId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ApiOperation(value = "찜 취소", notes = "장소를 찜을 취소하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "찜 취소 성공", response = HttpStatus.class),
            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
            @ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))

    })
    @DeleteMapping("/{placeId}")
    public ResponseEntity<Void> removeHeart(@PathVariable int placeId) {

        heartService.removeHeart(placeId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "찜 목록 조회", notes = "찜한 내역을 조회하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "찜 조회 성공", response = HttpStatus.class),
    })
    @GetMapping
    public ResponseEntity<List<FindPlaceResponse>> findHeart() {
        return ResponseEntity.ok().body(heartService.findHeart());
    }

}
