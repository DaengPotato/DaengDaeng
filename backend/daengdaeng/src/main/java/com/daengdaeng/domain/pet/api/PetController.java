package com.daengdaeng.domain.pet.api;import com.daengdaeng.domain.pet.dto.request.PetRequest;import com.daengdaeng.domain.pet.service.PetService;import io.swagger.annotations.*;import io.swagger.v3.oas.annotations.parameters.RequestBody;import lombok.RequiredArgsConstructor;import lombok.extern.slf4j.Slf4j;import org.springframework.http.HttpStatus;import org.springframework.http.MediaType;import org.springframework.http.ResponseEntity;import org.springframework.web.bind.annotation.PostMapping;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RestController;@Api(tags = "펫 API", description = "펫 관련 API (PetController)")@Slf4j@RestController@RequiredArgsConstructor@RequestMapping(value = "/pet", produces = MediaType.APPLICATION_JSON_VALUE)@ApiResponses({        @ApiResponse(code = 201, message = "반려동물 등록 성공", response = HttpStatus.class),        @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),        @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),        @ApiResponse(code = 500, message = "서버 연결 오류", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 500, \n message: 서버 연결 오류 \n}")))})public class PetController {    private final PetService petService;    @ApiOperation(value = "펫 정보 등록", notes = "펫 정보를 등록하는 API")    @ApiImplicitParam(name = "petRequest", value = "petRequest", dataTypeClass = PetRequest.class, paramType = "body")    @PostMapping    public ResponseEntity<Void> addPet(@RequestBody PetRequest petRequest) {        petService.addPet(petRequest);        return ResponseEntity.status(HttpStatus.CREATED).build();    }}