package com.daengdaeng.domain.place.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.place.domain.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
}
