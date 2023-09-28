package com.daengdaeng.domain.s3file.service;

import com.daengdaeng.domain.s3file.dto.FileNameAndUrlResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface S3Service {

    public boolean isFileExist(String folderName, String fileName);

    public String uploadFile(MultipartFile file, String folderName, String fileName);

    public boolean deleteFile(String folderName, String fileName) ;

    public List<FileNameAndUrlResponse> getFileNameAndUrlAtFolder(String forderName);

}
