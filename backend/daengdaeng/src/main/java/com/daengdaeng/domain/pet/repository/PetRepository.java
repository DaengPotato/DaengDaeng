package com.daengdaeng.domain.pet.repository;import org.springframework.data.jpa.repository.JpaRepository;import com.daengdaeng.domain.pet.domain.Pet;import org.springframework.data.jpa.repository.Query;import org.springframework.stereotype.Repository;import java.util.List;@Repositorypublic interface PetRepository extends JpaRepository<Pet, Integer> {    @Query("select p from Pet p where p.member.memberId = :memberId")    List<Pet> findByMemberId(int memberId);}