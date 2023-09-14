package com.daengdaeng.domain.place.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.place.domain.hashtag;

@Repository
public interface HashtagRepository extends JpaRepository<hashtag, Integer> {
}
