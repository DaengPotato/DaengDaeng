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
    private int photoId;

    @Column(length = 2048, nullable = false)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "place_id")
    private Place place;

    @Builder
    public Photo(String image, Member member, Place place) {
        this.image = image;
        this.member = member;
        this.place = place;
    }

}
