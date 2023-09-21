package com.daengdaeng.domain.place.dto.response;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class ReviewDto {

    private String reviewContent;

    private LocalDateTime resitDate;

}
