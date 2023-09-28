package com.daengdaeng.domain.photo.service;

import com.daengdaeng.domain.photo.dto.FrameListResponse;
import com.daengdaeng.domain.photo.dto.PhotoSearchResponse;
import org.springframework.web.multipart.MultipartFile;

public interface PhotoService {

    // 모든 댕댕네컷 정보 조회
    public PhotoSearchResponse findDaengCutsAll(int cursor);

    // memberId에 해당하는 댕댕네컷 정보 조회
    public PhotoSearchResponse findMyDaengCuts(int cursor);

    // s3에서 프레임 정보 전체 조회
    public FrameListResponse findFrames();

    // S3에 파일 업로드
    public String addDaengCutWithDateAtS3(MultipartFile file);

    // 업로드한 댕댕네컷 파일에 대한 정보를 DB에 추가
    public boolean addDaengCut(String image, int placeId);

}
