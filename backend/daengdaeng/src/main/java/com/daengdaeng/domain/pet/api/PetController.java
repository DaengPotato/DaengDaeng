package com.daengdaeng.domain.pet.api;import java.util.List;import org.springframework.http.HttpStatus;import org.springframework.http.MediaType;import org.springframework.http.ResponseEntity;import org.springframework.web.bind.annotation.*;import com.daengdaeng.domain.pet.dto.request.PetRequest;import com.daengdaeng.domain.pet.dto.response.PetNameResponse;import com.daengdaeng.domain.pet.dto.response.PetResponse;import com.daengdaeng.domain.pet.service.PetService;import io.swagger.annotations.Api;import io.swagger.annotations.ApiImplicitParam;import io.swagger.annotations.ApiOperation;import io.swagger.annotations.ApiResponse;import io.swagger.annotations.ApiResponses;import io.swagger.annotations.Example;import io.swagger.annotations.ExampleProperty;import lombok.RequiredArgsConstructor;import lombok.extern.slf4j.Slf4j;import org.springframework.web.multipart.MultipartFile;@Api(tags = "펫 API", description = "펫 관련 API (PetController)")@Slf4j@RestController@RequiredArgsConstructor@RequestMapping(value = "/pet", produces = MediaType.APPLICATION_JSON_VALUE)@ApiResponses({        @ApiResponse(code = 500, message = "서버 연결 오류", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 500, \n message: 서버 연결 오류 \n}")))})public class PetController {    private final PetService petService;    @ApiOperation(value = "반려동물 목록 기본 조회", notes = "반려동물 목록을 조회하는 API")    @ApiResponses({            @ApiResponse(code = 200, message = "반려동물 리스트 조회 성공"),            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}")))    })    @GetMapping    public ResponseEntity<List<PetNameResponse>> findPetInfo() {        return ResponseEntity.ok().body(petService.findPetInfo());    }    @ApiOperation(value = "반려동물 목록 상세 조회", notes = "반려동물 목록을 상세 조회하는 API")    @ApiResponses({            @ApiResponse(code = 200, message = "반려동물 리스트 조회 성공"),            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}")))    })    @GetMapping("/detail")    public ResponseEntity<List<PetResponse>> findPetDetailInfo() {        return ResponseEntity.ok().body(petService.findPetDetailInfo());    }    @ApiOperation(value = "반려동물 상세 조회", notes = "선택한 반려동물의 상세 정보를 조회하는 API")    @ApiResponses({            @ApiResponse(code = 200, message = "반려동물 상세 조회 성공"),            @ApiResponse(code = 403, message = "로그인 만료/비로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: expired \n}"))),            @ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))    })    @GetMapping("/{petId}")    public ResponseEntity<PetResponse> findPetDetailByPetId(@PathVariable int petId) {        return ResponseEntity.ok().body(petService.findPetDetailInfoByPetId(petId));    }    @ApiOperation(value = "펫 정보 등록", notes = "펫 정보를 등록하는 API")    @ApiImplicitParam(name = "petRequest", value = "petRequest", dataTypeClass = PetRequest.class, paramType = "body")    @ApiResponses({            @ApiResponse(code = 201, message = "반려동물 등록 성공", response = HttpStatus.class),            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}")))    })    @PostMapping    public ResponseEntity<Void> addPet(@RequestPart PetRequest petRequest, @RequestPart(value = "image", required = false) MultipartFile image) {        petService.addPet(petRequest, image);        return ResponseEntity.status(HttpStatus.CREATED).build();    }    @ApiOperation(value = "펫 정보 수정", notes = "펫 정보를 수정하는 API")    @ApiImplicitParam(name = "petRequest", value = "petRequest", dataTypeClass = PetRequest.class, paramType = "body")    @ApiResponses({            @ApiResponse(code = 200, message = "반려동물 정보 수정 성공", response = HttpStatus.class),            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),            @ApiResponse(code = 401, message = "미로그인", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: fail \n}"))),            @ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))    })    @PutMapping("/{petId}")    public ResponseEntity<Void> modifyPetInfo(@PathVariable int petId, @RequestPart PetRequest petRequest, @RequestPart(value = "image", required = false) MultipartFile image) {        petService.modifyPet(petId, petRequest, image);        return ResponseEntity.status(HttpStatus.OK).build();    }    @ApiOperation(value = "펫 정보 삭제", notes = "펫 정보를 삭제하는 API")    @ApiResponses({            @ApiResponse(code = 200, message = "반려동물 정보 삭제 성공", response = HttpStatus.class),            @ApiResponse(code = 400, message = "필요 정보 누락", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),            @ApiResponse(code = 404, message = "DB에 해당 정보가 들어있지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 404, \n message: not exist \n}")))    })    @DeleteMapping("/{petId}")    public ResponseEntity<Void> removePetInfo(@PathVariable int petId) {        petService.removePet(petId);        return ResponseEntity.status(HttpStatus.OK).build();    }}