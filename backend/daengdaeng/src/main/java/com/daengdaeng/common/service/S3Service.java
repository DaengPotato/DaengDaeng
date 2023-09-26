package com.daengdaeng.common.service;

import com.daengdaeng.common.dto.FileNameAndUrlResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface S3Service {

//    // presigned URL 만들기
//    public String getPresignedUrl(String folderName, String fileName);
//
    // 파일 조회해서 존재여부 판단하기
    public boolean isFileExist(String folderName, String fileName);



    // TODO: MultipartFile 사용할 수 있게 해서 구현 할 것. https://chanung.tistory.com/200    https://develop-writing.tistory.com/108   https://gaeggu.tistory.com/33    https://sennieworld.tistory.com/122    https://jsonobject.tistory.com/228

    public String uploadFile(MultipartFile file, String folderName, String fileName);

//    public String downloadFile(String folderName, String fileName);

    public boolean deleteFile(String folderName, String fileName) ;

    public List<FileNameAndUrlResponse> getFileNameAndUrlAtFolder(String forderName);
}
