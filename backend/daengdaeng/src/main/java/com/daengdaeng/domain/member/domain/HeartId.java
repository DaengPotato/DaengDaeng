package com.daengdaeng.domain.member.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

// 나중에 Place import 추가할 것

@Getter
@Data
@NoArgsConstructor
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
