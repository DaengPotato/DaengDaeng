package com.daengdaeng.domain.photo.service;

import com.daengdaeng.common.dto.ResponseMessage;
import com.daengdaeng.domain.photo.domain.Photo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {
    // 모든 댕댕네컷 정보 조회
    @Override
    public List<Photo> findDaengsCutsAll() {
        return null;
    }

    // memberId에 해당하는 댕댕네컷 정보 조회
    @Override
    public List<Photo> findDaengsCutsByMemberId(int memberId) {
        return null;
    }

    // s3에서 프레임 정보 조회
    @Override
    public List<Photo> findFrames() {
        return null;
    }

    // 업로드한 댕댕네컷 파일에 대한 정보를 DB에 추가
    @Override
    public ResponseMessage addDaengCut(String image, int memberId, int placeId) {
        return null;
    }

    // S3에 파일 업로드
    @Override
    public ResponseMessage addFileAtS3(String fileName) {
        return null;
    }

    // S3에서 파일명으로 조회
    @Override
    public ResponseMessage findFileAtS3(String fileName) {
        return null;
    }
}
