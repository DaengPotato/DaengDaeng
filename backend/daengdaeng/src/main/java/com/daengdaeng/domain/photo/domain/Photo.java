package com.daengdaeng.domain.photo.domain;

import com.daengdaeng.domain.place.domain.Place;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.lang.reflect.Member;

@Getter
@NoArgsConstructor
@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoId;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


    @ManyToOne
    @JoinColumn(name = "palce_id")
    private Place place;


    @Builder
    public Photo(Long photoId, String imageUrl, Member member, Place place) {
        this.photoId = photoId;
        this.imageUrl = imageUrl;
        this.member = member;
        this.place = place;
    }
}
