package com.example.daengdaeng.domain.photo.repository;

import com.example.daengdaeng.domain.photo.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {


}
