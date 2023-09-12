package com.daengdaeng.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.review.domain.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
