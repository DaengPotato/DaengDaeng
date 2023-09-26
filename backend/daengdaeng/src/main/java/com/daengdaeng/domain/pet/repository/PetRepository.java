package com.daengdaeng.domain.pet.repository;import java.util.List;import java.util.Optional;import org.springframework.data.jpa.repository.JpaRepository;import org.springframework.data.jpa.repository.Query;import org.springframework.stereotype.Repository;import com.daengdaeng.domain.pet.domain.Pet;@Repositorypublic interface PetRepository extends JpaRepository<Pet, Integer> {    Optional<Pet> findByPetId(int petId);    @Query("select p from Pet p where p.member.memberId = :memberId")    List<Pet> findByMemberId(int memberId);    @Query("select p from Pet p join fetch p.member where p.member.email = :memberEmail")    Optional<Pet> findByMemberEmail(String memberEmail);}