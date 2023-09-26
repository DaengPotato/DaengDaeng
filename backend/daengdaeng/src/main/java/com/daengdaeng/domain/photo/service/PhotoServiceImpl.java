package com.daengdaeng.domain.photo.service;

import com.daengdaeng.common.service.S3ServiceImpl;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.photo.domain.Photo;
import com.daengdaeng.domain.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;
    private final MemberRepository memberRepository;
    private final S3ServiceImpl S3Service;

    // 모든 댕댕네컷 정보 조회
    @Override
    public List<Photo> findDaengsCutsAll() {
        List<Photo> photoList = photoRepository.findAll();
        return photoList;
    }

    // memberId에 해당하는 댕댕네컷 정보 조회
    @Override
    public List<Photo> findDaengsCutsByMemberId(int memberId) {
            return null;
//        return photoRepository.findByMemberId(memberId);
    }

    // s3에서 프레임 정보 조회
    @Override
    public List<Photo> findFrames() {
//        S3Service.


        return null;
    }

    // TODO: 리스폰스메세지 dto에 담을 것?
    // 업로드한 댕댕네컷 파일에 대한 정보를 DB에 추가
    @Override
    public String addDaengCut(String image, int memberId, int placeId) {
        return null;
    }

    // S3에 파일 업로드
    @Override
    public String addFileAtS3(String fileName, MultipartFile file) {
        String newFileName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHH" + fileName));

        return S3Service.uploadFile(file, "daengFourCut", newFileName);
    }

    // S3에서 파일명으로 조회
//    @Override
//    public String findFileAtS3(String fileName) {
//        return null;
//    }
}
