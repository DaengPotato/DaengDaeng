package com.daengdaeng.domain.member.repository;

import com.daengdaeng.domain.member.domain.Heart;
import com.daengdaeng.domain.place.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeartRepository extends JpaRepository<Heart,Integer> {

    boolean existsByMemberMemberIdAndPlacePlaceId(int memberId, int placeId);

    int countByPlacePlaceId(int placeId);

     @Query("select h.place from Heart h where h.member.memberId = :memberId")
     List<Place> findAllByMemberId(int memberId);

}
