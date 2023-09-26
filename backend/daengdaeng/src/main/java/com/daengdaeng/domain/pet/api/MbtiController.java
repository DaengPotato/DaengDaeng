package com.daengdaeng.domain.pet.api;

import com.daengdaeng.domain.pet.domain.Mbti;
import com.daengdaeng.domain.pet.dto.request.MbtiRequest;
import com.daengdaeng.domain.pet.dto.response.MbtiResponse;
import com.daengdaeng.domain.pet.service.MbtiService;
import com.daengdaeng.domain.pet.service.PetService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private final PetService petService;

    @ApiOperation(value = "mbti 검사하기", notes = "mbti 질문 전송하는 API")
    @ApiResponse(code = 200, message = "검사 성공")
    @GetMapping
    public ResponseEntity<List<MbtiResponse>> findMbtiInfo() {
        return ResponseEntity.ok().body(mbtiService.findMbtiQuestion());
    }

    @ApiOperation(value = "mbti 검사 완료", notes = "mbti 결과를 저장하는 API")
    @ApiImplicitParam(name = "mbtiRequest", value = "mbtiRequest", dataTypeClass = MbtiRequest.class, paramType = "body")
    @ApiResponses({
            @ApiResponse(code = 200, message = "mbti 결과 저장 성공"),
            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
            @ApiResponse(code = 403, message = "로그인 만료/비로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: expired \n}"))),
            @ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))
    })
    @PatchMapping("/{petId}")
    public ResponseEntity<Void> addMbtiInfo(@PathVariable int petId, @RequestBody MbtiRequest mbti) {

        Mbti petMbti = mbtiService.findMbti(mbti.getMbti());
        petService.modifyMbtiInfo(petId, petMbti);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
