package com.daengdaeng.domain.pet.api;

import com.daengdaeng.domain.pet.dto.response.MbtiResponse;
import com.daengdaeng.domain.pet.service.MbtiService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "MBTI API", description = "댕BTI 관련 API (MbtiController) ")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/mbti", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),
        @ApiResponse(code = 500, message = "서버 연결 오류", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 500, \n message: 서버 연결 오류 \n}")))

})
public class MbtiController {

    private final MbtiService mbtiService;

    @ApiOperation(value = "mbti 검사하기", notes = "mbti 질문 전송하는 API")
    @ApiResponse(code = 200, message = "검사 성공")
    @GetMapping
    public ResponseEntity<List<MbtiResponse>> findMbtiInfo() {
        return ResponseEntity.ok().body(mbtiService.findMbtiQuestion());
    }

}
