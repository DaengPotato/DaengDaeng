package com.daengdaeng.domain.photo.api;

import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.photo.service.PhotoServiceImpl;
import com.daengdaeng.global.util.JwtTokenUtil;
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
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;

    // TODO: 페이지네이션 처리 할 것
    @GetMapping
    // 전체 댕댕네컷 조회
    public ResponseEntity<?> seeAllDaengs() {
        // 전체 댕댕네컷 정보 조회

        return ResponseEntity.ok().body(photoService.findDaengsCutsAll());
    }

    // TODO: 페이지네이션 처리 할 것
    @GetMapping("/myPhoto")
    // 내 댕댕네컷 조회, 헤더 엑세스 토큰
    public ResponseEntity<?> seeMyDaengs(@RequestHeader("Authorization") String token) {
        // 엑세스 토큰에서 유저 아이디 뽑기
        String userEmail = jwtTokenUtil.getUsername(token);
        int memberId = memberRepository.findMemberByEmail(userEmail).getMemberId();
        // 뽑은 유저 아이디로 댕댕네컷 조회해서 반환

        return ResponseEntity.ok().body(photoService.findDaengsCutsByMemberId(memberId));
    }

    // 댕댕네컷 프레임 조회. 프레임은 s3에 있음
    public ResponseEntity<?> seeFrames() {
        // s3에서 전체 댕댕네컷 프레임 조회
        return ResponseEntity.ok().body(photoService.findFrames());
    }

    // 댕댕네컷 s3 업로드 요청, 헤더 엑세스 토큰
    public ResponseEntity<?> uploadDaengCut(@RequestHeader("Authorization") String token, @RequestBody MultipartFile file) {
        // 엑세스 토큰에서 유저 아이디 뽑기
        String userEmail = jwtTokenUtil.getUsername(token);
        int memberId = memberRepository.findMemberByEmail(userEmail).getMemberId();
        // s3에 유저 아이디로 업로드 요청




        return null;
    }

    // 댕댕네컷 업로드 결과 전송, 헤더 엑세스 토큰
    public ResponseEntity<?> isSuccessedUploadDaengCut() {
        // 헤더 엑세스 토큰에서 유저 아이디 뽑기

        //
        return null;
    }
}
