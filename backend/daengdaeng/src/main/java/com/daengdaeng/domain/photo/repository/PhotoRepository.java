package com.daengdaeng.domain.photo.repository;


import com.daengdaeng.domain.photo.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

//    @Query("select Photo from Photo as ph where ph.member.memberId = :memberId")
//    List<Photo> findByMemberId(int memberId);
}
