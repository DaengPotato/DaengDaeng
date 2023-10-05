package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.review.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewPetRepository extends JpaRepository<ReviewPet, ReviewPetId> {

    List<ReviewPet> findAllByReview(Review review);

    void deleteByReviewPetId(ReviewPetId reviewPetId);

}
