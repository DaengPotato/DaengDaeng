package com.daengdaeng.domain.review.domain;

import com.daengdaeng.domain.pet.domain.Pet;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewPet {

    @EmbeddedId
    private ReviewPetId reviewPetId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", insertable = false, updatable = false, nullable = false)
    private Review review;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", insertable = false, updatable = false, nullable = false)
    private Pet pet;

    @Builder
    public ReviewPet(ReviewPetId reviewPetId){
        this.reviewPetId = reviewPetId;
    }

}
