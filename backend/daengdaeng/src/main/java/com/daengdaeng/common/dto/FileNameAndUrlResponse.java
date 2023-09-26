package com.daengdaeng.common.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class FileNameAndUrlResponse {
    String fileName;
    String fileUrl;

    public static FileNameAndUrlResponse of(String fileName, String fileUrl){
        return FileNameAndUrlResponse.builder()
                .fileName(fileName)
                .fileUrl(fileUrl)
                .build();
    }
}
