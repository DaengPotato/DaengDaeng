package com.daengdaeng.domain.photo.api;

import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.member.service.MemberServiceImpl;
import com.daengdaeng.domain.photo.dto.FrameListResponse;
import com.daengdaeng.domain.photo.dto.PhotoSearchResponse;
import com.daengdaeng.domain.photo.service.PhotoServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/photo", produces = MediaType.APPLICATION_JSON_VALUE)
public class PhotoController {

    private final PhotoServiceImpl photoService;

    @GetMapping
    // 전체 댕댕네컷 조회
    public ResponseEntity<PhotoSearchResponse> seeAllDaengs(int cursor) {

        return ResponseEntity.ok().body(photoService.findDaengCutsAll(cursor));

    }

    @GetMapping("/myPhoto")
    // 내 댕댕네컷 조회, 헤더 엑세스 토큰
    public ResponseEntity<PhotoSearchResponse> seeMyDaengs(int cursor) {

        // 뽑은 유저 아이디로 댕댕네컷 조회해서 반환
        return ResponseEntity.ok().body(photoService.findMyDaengCuts(cursor));
    }

    @GetMapping("frame")
    // 댕댕네컷 프레임 조회. 프레임은 s3에 있음
    public ResponseEntity<FrameListResponse> seeFrames() {
        // s3에서 전체 댕댕네컷 프레임 조회
        return ResponseEntity.ok().body(photoService.findFrames());
    }

    @PostMapping("upload/request")
    // 댕댕네컷 s3 업로드, 헤더 엑세스 토큰
    public ResponseEntity<String> uploadDaengCut(MultipartFile file, int placeId) {
        // s3에 업로드
        String savedUrl = photoService.addDaengCutWithDateAtS3(file);

        //업로드 된 정보를 DB에 저장
        photoService.addDaengCut(savedUrl,placeId);

        return ResponseEntity.ok().body("upload success");
    }

}
