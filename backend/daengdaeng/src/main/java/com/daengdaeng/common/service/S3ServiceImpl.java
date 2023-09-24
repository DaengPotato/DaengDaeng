package com.daengdaeng.common.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AmazonS3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public String uploadFile(MultipartFile file, String folderName, String fileName) {
        // 업로드 한 파일이 없으면 메세지 담아서 리턴
        if (file == null)
            return "400:No files";

        try {
            log.info("파일 업로드 시도...");
//            String fileName = file.getOriginalFilename();
//            String fileUrl = "https://" + bucket + "/" + folderName + "/" + fileName;
            String objectKey = folderName + "/" + fileName;

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());
//            metadata.addUserMetadata("path", folderName);

            s3Client.putObject(bucket, objectKey, file.getInputStream(), metadata);
            return s3Client.getUrl(bucket, objectKey).toString();
        } catch (Exception e) {
            return "500:Upload Fail";
        }
    }


    // TODO: 다운로드도 구현할 지 상의할 것 https://chb2005.tistory.com/200
//    public String downloadFile(String folderName, String fileName) {
//        String objectKey = folderName + "/" + fileName;
//
//        return null;
//
//    }

    @Override
    public String deleteFile(String folderName, String fileName) {
        String objectKey = folderName + "/" + fileName;
        try {
            s3Client.deleteObject(bucket, objectKey);
            return "200:Delete Success";
        } catch (Exception e) {
            return "500:Delete Fail";
        }
    }
}
