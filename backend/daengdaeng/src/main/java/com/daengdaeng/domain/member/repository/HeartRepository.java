package com.daengdaeng.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.daengdaeng.domain.member.domain.Heart;
import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.place.domain.Place;

@Repository
public interface HeartRepository extends JpaRepository< Heart,Integer> {


    boolean existsByMemberMemberIdAndPlacePlaceId(int memberId, int placeId);
    int countByPlacePlaceId(int placeId);

}
