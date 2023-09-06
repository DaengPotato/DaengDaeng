package com.daengdaeng.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.daengdaeng.domain.member.domain.Heart;
@Repository
public interface HeartRepository extends JpaRepository< Heart,Integer> {
}
