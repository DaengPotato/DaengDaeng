package com.daengdaeng.common.service;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

    // TODO: MultipartFile 사용할 수 있게 해서 구현 할 것. https://chanung.tistory.com/200    https://develop-writing.tistory.com/108   https://gaeggu.tistory.com/33    https://sennieworld.tistory.com/122    https://jsonobject.tistory.com/228

    public String uploadFile(MultipartFile file, String folderName, String fileName);

//    public String downloadFile(String folderName, String fileName);

    public String deleteFile(String folderName, String fileName) ;
}
