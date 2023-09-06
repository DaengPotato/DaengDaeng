package com.daengdaeng.domain.member.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

// 나중에 Place import 추가할 것

@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class HeartId implements Serializable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @Builder
    public HeartId(Member member, Place place) {
        this.member = member;
        this.place = place;
    }
}
