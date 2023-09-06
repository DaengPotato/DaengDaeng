package com.daengdaeng.domain.photo.domain;

import com.daengdaeng.domain.place.domain.Place;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import com.daengdaeng.domain.member.domain.Member;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer photoId;

    @Column(nullable = false)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Column(nullable = false)
    private Member member;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    @Column(nullable = false)
    private Place place;


    @Builder
    public Photo(Integer photoId, String image, Member member, Place place) {
        this.photoId = photoId;
        this.image = image;
        this.member = member;
        this.place = place;
    }
}
