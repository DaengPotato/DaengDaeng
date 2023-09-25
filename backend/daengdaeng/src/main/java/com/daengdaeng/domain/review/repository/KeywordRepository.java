package com.daengdaeng.domain.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.review.domain.Keyword;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Integer> {

	List<Keyword> findByCategoryCategoryId(byte categoryId);

}
