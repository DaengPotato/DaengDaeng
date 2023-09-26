package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.review.domain.Review;
import com.daengdaeng.domain.review.domain.ReviewPet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.review.domain.ReviewKeyword;

import java.util.List;

@Repository
public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, Integer> {

	ReviewKeyword findByReview(Review review);

	List<ReviewKeyword> findAllByReview(Review review);

	// int countByKeywordKeywordId(int keywordId);
	int countByReviewPlacePlaceIdAndKeywordKeywordId(int placeId, int keywordId);

}
