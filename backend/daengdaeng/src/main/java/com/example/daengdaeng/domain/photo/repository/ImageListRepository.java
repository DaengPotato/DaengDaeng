package com.example.daengdaeng.domain.photo.repository;

import com.example.daengdaeng.domain.photo.domain.ImageList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageListRepository extends JpaRepository<ImageList, Long> {
}
