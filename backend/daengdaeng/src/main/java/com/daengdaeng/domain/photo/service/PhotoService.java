package com.daengdaeng.domain.photo.service;

import com.daengdaeng.domain.photo.domain.Photo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PhotoService {
    // 모든 댕댕네컷 정보 조회
    public List<Photo> findDaengsCutsAll();

    // memberId에 해당하는 댕댕네컷 정보 조회
    public List<Photo> findDaengsCutsByMemberId(int memberId);

    // s3에서 프레임 정보 조회
    public List<Photo> findFrames();

    // 업로드한 댕댕네컷 파일에 대한 정보를 DB에 추가
    public String addDaengCut(String image, int memberId, int placeId);

    // S3에 파일 업로드
    public String addFileAtS3(String fileName, MultipartFile file);

//    // S3에서 파일명으로 조회
//    public String findFileAtS3(String fileName);


}
