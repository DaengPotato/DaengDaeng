package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.review.domain.ReviewPet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.review.domain.ReviewKeyword;

import java.util.Optional;

@Repository
public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, Integer> {

    Optional<ReviewKeyword> findByReviewId(int reviewId);

	// int countByKeywordKeywordId(int keywordId);
	int countByReviewPlacePlaceIdAndKeywordKeywordId(int placeId, int keywordId);

}
