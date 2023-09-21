package com.daengdaeng.domain.place.dto;

import com.daengdaeng.domain.place.domain.Hashtag;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashtagResponse {
    @NotNull
    private int hashtagId;

    @NotBlank
    private String hashtag;

    public static HashtagResponse of(Hashtag hashtag){
        return HashtagResponse.builder()
                .hashtagId(hashtag.getHashtagId())
                .hashtag(hashtag.getHashtag())
                .build();
    }
}
