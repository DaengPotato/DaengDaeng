package com.daengdaeng.domain.review.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Embeddable
public class ReviewPetId implements Serializable {

    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "pet_id")
    private int petId;

}
