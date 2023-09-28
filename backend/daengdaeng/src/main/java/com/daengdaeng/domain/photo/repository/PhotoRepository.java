package com.daengdaeng.domain.photo.repository;


import com.daengdaeng.domain.photo.domain.Photo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT ph From Photo AS ph WHERE ph.member.memberId = :memberId")
    Page<Photo> findByMemberId(int memberId, Pageable pageable);

}
