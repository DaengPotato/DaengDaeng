package com.daengdaeng.domain.pet.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
public class MbtiTypeResponse {

    @NotBlank
    @ApiModelProperty(value = "답변 A 타입", required = true, example = "W")
    private char typeA;

    @NotBlank
    @ApiModelProperty(value = "답변 B 타입", required = true, example = "D")
    private char typeB;

}
