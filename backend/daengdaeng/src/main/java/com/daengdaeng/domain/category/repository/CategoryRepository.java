package com.daengdaeng.domain.category.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daengdaeng.domain.category.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findByCategoryId(int categoryId);
    List<Category> findAll();

}
