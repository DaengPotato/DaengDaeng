package com.daengdaeng.common.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.daengdaeng.common.dto.FileNameAndUrlResponse;
import com.daengdaeng.config.S3Config;
import com.daengdaeng.global.exception.S3Exception;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

//    private final S3Config s3Config;
//    private final AmazonS3Client amazonS3Client;
//
//    private String bucket = s3Config.getBucket();
//
//    @Override
//    public String getPresignedUrl(String folderName, String fileName) {
//        // 비어있는 잘못된 요청
//        if (folderName == null || fileName == null)
//            throw new IllegalArgumentException("getPresignedUrl error: empty parameter");
//        // 파일 키 생성
//        String objectKey = folderName + "/" + fileName;
//
//        // 이미 같은 이름의 이미지가 존재한다면 삭제
//        if (isFileExist(s3Config.getBaseAddress() + objectKey))
//            amazonS3Client.deleteObject(bucket, objectKey);
//
//        // 만료 시간 설정
//        Date expiration = new Date();
//        long expTimeMillis = expiration.getTime() + 1000 * 60 * s3Config.getPreSignExpMinute();
//        expiration.setTime(expTimeMillis);
//
//        // request 생성
//        GeneratePresignedUrlRequest genRequest = new GeneratePresignedUrlRequest(bucket, objectKey)
//                .withMethod(HttpMethod.PUT)
//                .withExpiration(expiration);
//
//        // 리퀘스트에 퍼블릭 읽기 가능 설정
//        genRequest.addRequestParameter(
//                Headers.S3_CANNED_ACL,
//                CannedAccessControlList.PublicRead.toString());
//
//        String presignedUrl = amazonS3Client.generatePresignedUrl(genRequest);
//        );
//
//
//        amazonS3Client.generatePresignedUrl(bucket, objectKey, expiration, HttpMethod.POST);
////    public URL generatePresignedUrl(String bucketName, String key, Date expiration, HttpMethod method)
////            throws SdkClientException;
//        return null;
//    }
//
//    @Override
//    public boolean isFileExist(String url) throws IllegalArgumentException {
//        // 빈 주소 들어온 잘못된 요청
//        if (url == null)
//            throw new IllegalArgumentException("isFileExist: empty parameter");
//        // 파일 베이스url 검증
//        String base = s3Config.getBaseAddress();
//        String parsedBase = url.substring(0, base.length());
//
//        // 들어온 주소가 우리꺼랑 다른 잘못된 요청
//        if (!base.equals(parsedBase))
//            throw new IllegalArgumentException("isFileExist: wrong base url");
//
//        // 파일키 파싱
//        String parsedKey = url.substring(base.length());
//
//        // s3에서 파일 조회 결과 boolean 반환
//        return amazonS3Client.doesObjectExist(s3Config.getBucket(), parsedKey);
//    }

    private final S3Config s3Config;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public boolean isFileExist(String folderName, String fileName) throws IllegalArgumentException {
        // 빈 주소 들어온 잘못된 요청
        if (folderName == null || fileName == null)
            throw new IllegalArgumentException("isFileExist: empty parameter");

        String objectKey = folderName + "/" + fileName;

        // s3에서 파일 조회 결과 boolean 반환
        return amazonS3Client.doesObjectExist(s3Config.getBucket(), objectKey);
    }


    @Override
    public String uploadFile(MultipartFile file, String folderName, String fileName) {
        // null 값
        if (folderName == null || fileName == null)
            throw new NullPointerException("uploadFile error: null parameter");

        // 비어있는 잘못된 요청
        if (folderName.equals("") || fileName.equals(""))
            throw new IllegalArgumentException("uploadFile error: empty string parameter");

        // 업로드 한 파일이 없으면 메세지 담아서 리턴
        if (file == null)
            throw new IllegalArgumentException("uploadFile error: empty file");

        // 파일 키 생성
        String objectKey = folderName + "/" + fileName;

        // 이미 같은 이름의 이미지가 존재한다면 삭제
        if (isFileExist(folderName, fileName)) {
            boolean successDelete = deleteFile(folderName, fileName);
            if (!successDelete)
                throw new S3Exception("uploadFile error: file already exists and failed delete");
        }
//            String fileName = file.getOriginalFilename();
//            String fileUrl = "https://" + bucket + "/" + folderName + "/" + fileName;

        // 파일 메타데이터 설정
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
//            metadata.addUserMetadata("path", folderName);

        // 파일 업로드 시도
        try {
            log.info("파일 업로드 시도...");
            amazonS3Client.putObject(bucket, objectKey, file.getInputStream(), metadata);
        } catch (IOException e) {
            throw new RuntimeException("uploadFile error : file.getInputStream failed");
        }

        // 업로드 시도했으나 등록된 파일을 찾을 수 없는 경우
        if (!isFileExist(folderName, fileName))
            throw new S3Exception("uploadFile error: file not exist after try upload");

        // 업로드 성공시 업로드된 url 반환
        return amazonS3Client.getUrl(bucket, objectKey).toString();

    }


    // TODO: 다운로드도 구현할 지 상의할 것 https://chb2005.tistory.com/200
//    public String downloadFile(String folderName, String fileName) {
//        String objectKey = folderName + "/" + fileName;
//
//        return null;
//
//    }

    @Override
    public boolean deleteFile(String folderName, String fileName) {
        // null 값
        if (folderName == null || fileName == null)
            throw new NullPointerException("deleteFile error: null parameter");

        // 비어있는 잘못된 요청
        if (folderName.equals("") || fileName.equals(""))
            throw new IllegalArgumentException("deleteFile error: empty string parameter");

        String objectKey = folderName + "/" + fileName;
        try {
            amazonS3Client.deleteObject(bucket, objectKey);
            return true;
        } catch (Exception e) {
            log.error("caused by S3 delete : " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<FileNameAndUrlResponse> getFileNameAndUrlAtFolder(String folderName) {
        // null 값
        if (folderName == null)
            throw new NullPointerException("getFileNameAtFolder error: null parameter");


        List<FileNameAndUrlResponse> result = new ArrayList<>();
        List<S3ObjectSummary> searchList = amazonS3Client.listObjectsV2(bucket,folderName).getObjectSummaries();

        for(S3ObjectSummary fileSummary:searchList){
            String thisName = fileSummary.getKey();
            String thisUrl  = amazonS3Client.getUrl(bucket,fileSummary.getKey()).toString();
            result.add(FileNameAndUrlResponse.of(thisName,thisUrl));
        }

        return result;
    }


}