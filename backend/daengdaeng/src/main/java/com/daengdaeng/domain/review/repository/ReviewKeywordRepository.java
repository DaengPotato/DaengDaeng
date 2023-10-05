package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.review.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, ReviewKeywordId> {

	List<ReviewKeyword> findAllByReview(Review review);

	int countByReviewPlacePlaceIdAndKeywordKeywordId(int placeId, int keywordId);

	void deleteByReviewKeywordId(ReviewKeywordId reviewKeywordId);
}
