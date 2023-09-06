package com.daengdaeng.domain.member.domain;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

// 나중에 Place import 추가할 것

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
@Builder
public class HeartId implements Serializable {

    @Column(name = "member_id")
    private int memberId;

    @Column(name = "place_id")
    private int placeId;

}
