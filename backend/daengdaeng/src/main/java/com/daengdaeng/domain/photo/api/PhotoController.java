package com.daengdaeng.domain.photo.api;

import com.daengdaeng.domain.photo.service.PhotoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PhotoController {
    private final PhotoServiceImpl photoService;

    // 전체 댕댕네컷 조회
    public ResponseEntity<?> seeAllDaengs (){
        // 전체 댕댕네컷 정보 조회

        return null;
    }

    // 내 댕댕네컷 조회, 헤더 엑세스 토큰
    public ResponseEntity<?> seeMyDaengs(){
        // 엑세스 토큰에서 유저 아이디 뽑기

        // 뽑은 유저 아이디로 댕댕네컷 조회
     return null;
    }

    // 댕댕네컷 프레임 조회. 프레임은 s3에 있음
    public ResponseEntity<?> seeFrames(){
        // s3에서 전체 댕댕네컷 프레임 조회

        return null;
    }

    // 댕댕네컷 s3 업로드 요청, 헤더 엑세스 토큰
    public ResponseEntity<?> uploadDaengCut(){
        // 헤더 엑세스 토큰에서 유저 아이디 뽑기

        // s3에 유저 아이디로 업로드 요청



        return null;
    }

    // 댕댕네컷 업로드 결과 전송, 헤더 엑세스 토큰
    public ResponseEntity<?> isSuccessedUploadDaengCut(){
        // 헤더 엑세스 토큰에서 유저 아이디 뽑기

        //
        return null;
    }
}
