package com.daengdaeng.domain.member.repository;

import com.daengdaeng.domain.member.domain.Heart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeartRepository extends JpaRepository< Heart,Integer> {

    boolean existsByMemberMemberIdAndPlacePlaceId(int memberId, int placeId);

    int countByPlacePlaceId(int placeId);

}
