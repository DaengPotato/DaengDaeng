package com.daengdaeng.domain.review.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.review.domain.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

	@Query("SELECT AVG(r.score) FROM Review r WHERE r.place.placeId = :placeId")
	Optional<Integer> findAverageScoreByPlaceId(int placeId);

	List<Review> findByPlacePlaceId(int placeId);


}
