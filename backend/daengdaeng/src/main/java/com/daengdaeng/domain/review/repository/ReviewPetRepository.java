package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.pet.domain.Pet;
import com.daengdaeng.domain.review.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewPetRepository extends JpaRepository<ReviewPet, ReviewPetId> {

    ReviewPet findByReview(Review review);

    List<ReviewPet> findAllByReview(Review review);

    @Query("SELECT r FROM  ReviewPet r WHERE r.review = :review AND r.pet = :pet")
    ReviewPet findByReviewAndPet(Review review, Pet pet);

    void deleteByReviewPetId(ReviewPetId reviewPetId);

}
