package com.daengdaeng.domain.review.repository;

import com.daengdaeng.domain.place.domain.Place;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.review.domain.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    Optional<Review> findByReviewId(int reviewId);

	List<Review> findByMemberId(int memberId);

	@Query("SELECT AVG(r.score) FROM Review r WHERE r.place.placeId = :placeId")
	Optional<Double> findAverageScoreByPlaceId(int placeId);

	List<Review> findByPlacePlaceId(int placeId);


}
