package com.daengdaeng.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.review.domain.ReviewKeyword;

@Repository
public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, Integer> {
}
