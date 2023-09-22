package com.daengdaeng.domain.place.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.place.domain.Place;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {

    List<Place> findByPlaceIdIn(List<Integer> placeId);

}
