package com.daengdaeng.domain.photo.api;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.photo.service.PhotoServiceImpl;
import com.daengdaeng.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/photo", produces = MediaType.APPLICATION_JSON_VALUE)
public class PhotoController {
    private final PhotoServiceImpl photoService;
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/test")
    // 전체 댕댕네컷 조회
    public ResponseEntity<?> test() {

        return ResponseEntity.ok().body("test");
    }

    // TODO: 페이지네이션 처리 할 것
    @GetMapping
    // 전체 댕댕네컷 조회
    public ResponseEntity<?> seeAllDaengs(int cursor) {

        return ResponseEntity.ok().body(photoService.findDaengCutsAll(cursor));
    }

    // TODO: 페이지네이션 처리 할 것
    @GetMapping("/myPhoto")
    // 내 댕댕네컷 조회, 헤더 엑세스 토큰
    public ResponseEntity<?> seeMyDaengs(@RequestHeader("Authorization") String token, int cursor) {
        // 엑세스 토큰에서 멤버아이디 뽑기
        String userEmail = getCurrentEmail();
        Member member = memberRepository.findByEmail(userEmail).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));


        // 뽑은 유저 아이디로 댕댕네컷 조회해서 반환
        return ResponseEntity.ok().body(photoService.findDaengCutsByMemberId(member.getMemberId(), cursor));
    }

    @GetMapping("frame")
    // 댕댕네컷 프레임 조회. 프레임은 s3에 있음
    public ResponseEntity<?> seeFrames() {
        // s3에서 전체 댕댕네컷 프레임 조회
        return ResponseEntity.ok().body(photoService.findFrames());
    }

    @PostMapping("upload/request")
    // 댕댕네컷 s3 업로드, 헤더 엑세스 토큰
    public ResponseEntity<?> uploadDaengCut(@RequestHeader("Authorization") String token, MultipartFile file, int placeId) {
        // 엑세스 토큰에서 멤버 아이디 뽑기
//        String userEmail = "userOVcxHW42@kakao.com";
//        String userEmail = jwtTokenUtil.getUsername(token);
        String userEmail = getCurrentEmail();
        Optional<Member> thisMember = memberRepository.findByEmail(userEmail);
        int memberId = thisMember.get().getMemberId();

        // s3에 업로드
        String savedUrl = photoService.addDaengCutWithDateAtS3(memberId, file);

        //업로드 된 정보를 DB에 저장
        photoService.addDaengCut(savedUrl,memberId,placeId);

        return ResponseEntity.ok().body("upload success");
    }
//
//    @PostMapping("/upload")
//    // 댕댕네컷 업로드 결과 전송, 헤더 엑세스 토큰
//    public ResponseEntity<?> isSuccessedUploadDaengCut() {
//        // 헤더 엑세스 토큰에서 유저 아이디 뽑기
//
//        //
//        return null;
//    }

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 이메일 추출
     * @return String : 이메일
     */
    private String getCurrentEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }
}
