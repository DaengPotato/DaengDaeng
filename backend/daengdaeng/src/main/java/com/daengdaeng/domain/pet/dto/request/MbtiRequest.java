package com.daengdaeng.domain.pet.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@ApiModel(description = "반려동물 mbti 정보")
public class MbtiRequest {

    @NotBlank
    @ApiModelProperty(value = "반려동물 mbti", required = true, example = "EWOS")
    private String mbti;

}
