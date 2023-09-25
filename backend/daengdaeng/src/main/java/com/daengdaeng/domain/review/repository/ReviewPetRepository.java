package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.pet.domain.Pet;
import com.daengdaeng.domain.review.domain.ReviewPet;
import com.daengdaeng.domain.review.domain.ReviewPetId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewPetRepository extends JpaRepository<ReviewPet, ReviewPetId> {

    Optional<ReviewPet> findByReviewId(int reviewId);

}
