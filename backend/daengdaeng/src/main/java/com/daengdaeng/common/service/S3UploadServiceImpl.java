package com.daengdaeng.common.service;

import com.amazonaws.services.s3.AmazonS3Client;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
// TODO: @Slf4j을 붙여야 할지 알아볼 것
@RequiredArgsConstructor
public class S3UploadServiceImpl {
    private final AmazonS3Client amazonS3Client;

    //    @Value("${cloud.aws.s3.bucket}")
    private String bucket;




}
