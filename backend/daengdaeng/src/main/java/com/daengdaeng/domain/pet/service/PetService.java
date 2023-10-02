package com.daengdaeng.domain.pet.service;import com.daengdaeng.domain.pet.domain.Mbti;import com.daengdaeng.domain.pet.dto.request.PetRequest;import com.daengdaeng.domain.pet.dto.response.PetNameResponse;import com.daengdaeng.domain.pet.dto.response.PetResponse;import org.springframework.web.multipart.MultipartFile;import java.util.List;public interface PetService {    List<PetNameResponse> findPetInfo();    List<PetResponse> findPetDetailInfo();    PetResponse findPetDetailInfoByPetId(int petId);    void addPet(PetRequest petRequest, MultipartFile image);    void modifyPet(int petId, PetRequest petRequest, MultipartFile image);    void modifyMbtiInfo(int petId, Mbti mbtiId);    void removePet(int petId);}