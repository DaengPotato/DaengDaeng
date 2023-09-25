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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "review_id", insertable = false, updatable = false, nullable = false)
    private Review review;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "pet_id", insertable = false, updatable = false, nullable = false)
    private Pet pet;

    @Builder
    public ReviewPet(Review review, Pet pet){
        this.review = review;
        this.pet = pet;
    }

    public void modifyReviewPet(Pet Pet){
        this.pet = pet;
    }

}
