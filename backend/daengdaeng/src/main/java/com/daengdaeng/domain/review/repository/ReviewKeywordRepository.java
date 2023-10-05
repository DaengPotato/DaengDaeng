package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.review.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, ReviewKeywordId> {

	ReviewKeyword findByReview(Review review);

	List<ReviewKeyword> findAllByReview(Review review);

	// int countByKeywordKeywordId(int keywordId);
	int countByReviewPlacePlaceIdAndKeywordKeywordId(int placeId, int keywordId);

	@Query("SELECT r FROM  ReviewKeyword r WHERE r.review = :review AND r.keyword = :keyword")
	ReviewKeyword findByReviewAndKeyword(Review review, Keyword keyword);

	void deleteByReviewKeywordId(ReviewKeywordId reviewKeywordId);
}
