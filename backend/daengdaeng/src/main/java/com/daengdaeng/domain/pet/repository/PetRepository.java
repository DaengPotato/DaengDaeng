package com.daengdaeng.domain.pet.repository;import org.springframework.data.jpa.repository.JpaRepository;import com.daengdaeng.domain.pet.domain.Pet;public interface PetRepository extends JpaRepository<Pet, Integer> {}