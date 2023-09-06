package com.example.daengdaeng.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.daengdaeng.domain.member.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
//Optianal<Member> findMemberById(String )

}
