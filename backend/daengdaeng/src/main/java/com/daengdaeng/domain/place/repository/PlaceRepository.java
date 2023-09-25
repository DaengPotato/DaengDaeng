package com.daengdaeng.domain.place.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.place.domain.Place;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {

    Place findPlaceByPlaceId(int placeId);

    // 키워드와 카테고리 ID를 사용하여 Place를 검색하는 메서드
    @Query("SELECT p FROM Place p WHERE " +
        "(:keyword IS NULL OR p.title LIKE %:keyword%) " +
        "AND (:category IS NULL OR p.category.categoryId = :category) " +
        "ORDER BY p.placeId ASC")
    List<Place> findByKeywordAndCategory(String keyword, Byte category, Pageable pageable);


}
