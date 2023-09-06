package com.daengdaeng.domain.photo.domain;

import com.daengdaeng.domain.place.domain.Place;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.lang.reflect.Member;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer photoId;

    @NotBlank
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    @NotNull
    private Place place;


    @Builder
    public Photo(Integer photoId, String image, Member member, Place place) {
        this.photoId = photoId;
        this.image = image;
        this.member = member;
        this.place = place;
    }
}
