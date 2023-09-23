package com.daengdaeng.domain.pet.service;import com.daengdaeng.domain.member.domain.Member;import com.daengdaeng.domain.member.repository.MemberRepository;import com.daengdaeng.domain.pet.domain.Mbti;import com.daengdaeng.domain.pet.domain.Pet;import com.daengdaeng.domain.pet.dto.request.PetRequest;import com.daengdaeng.domain.pet.dto.response.PetNameResponse;import com.daengdaeng.domain.pet.dto.response.PetResponse;import com.daengdaeng.domain.pet.repository.PetRepository;import com.daengdaeng.global.exception.UserException;import lombok.RequiredArgsConstructor;import lombok.extern.slf4j.Slf4j;import org.springframework.security.core.Authentication;import org.springframework.security.core.context.SecurityContextHolder;import org.springframework.security.core.userdetails.UserDetails;import org.springframework.stereotype.Service;import javax.transaction.Transactional;import javax.validation.Valid;import java.util.List;import java.util.NoSuchElementException;import java.util.stream.Collectors;@Slf4j@Service@RequiredArgsConstructor@Transactionalpublic class PetServiceImpl implements PetService {    private final PetRepository petRepository;    private final MemberRepository memberRepository;    @Override    public List<PetNameResponse> findPetInfo() {        Member member = memberRepository.findByEmail(getCurrentEmail())                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));        List<Pet> petList = petRepository.findByMemberId(member.getMemberId());        List<PetNameResponse> petNameResponseList = petList.stream().map(            pet -> {                return PetNameResponse.builder()                    .petId(pet.getPetId())                    .name(pet.getName())                    .build();            })            .collect(Collectors.toList());        return petNameResponseList;    }    @Override    public List<PetResponse> findPetDetailInfo() {        Member member = memberRepository.findByEmail(getCurrentEmail())            .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));        List<Pet> petList = petRepository.findByMemberId(member.getMemberId());        List<PetResponse> petResponseList = petList.stream()            .map(pet -> {                return PetResponse.builder()                    .petId(pet.getPetId())                    .name(pet.getName())                    .birth(pet.getBirth())                    .gender(pet.isGender())                    .weight(pet.getWeight())                    .image(pet.getImage())                    .mbtiId(pet.getMbti() == null ? null : Integer.valueOf(pet.getMbti().getMbtiId()))                    .build();            })            .collect(Collectors.toList());        return petResponseList;    }    @Override    public PetResponse findPetDetailInfoByPetId(int petId) {        Pet pet = petRepository.findById(petId)            .orElseThrow(() -> new NoSuchElementException("반려동물 정보가 없습니다."));        return PetResponse.builder()            .petId(pet.getPetId())            .name(pet.getName())            .birth(pet.getBirth())            .gender(pet.isGender())            .weight(pet.getWeight())            .image(pet.getImage())            .mbtiId(pet.getMbti() == null ? null : Integer.valueOf(pet.getMbti().getMbtiId()))            .build();    }    @Override    public void addPet(@Valid PetRequest petRequest) {        Member member = memberRepository.findByEmail(getCurrentEmail())                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));        if (member == null) {            throw new UserException("미로그인");        }        Pet pet = Pet.builder()                .name(petRequest.getName())                .birth(petRequest.getBirth())                .gender(petRequest.isGender())                .weight(petRequest.getWeight())                .image(petRequest.getImage())                .member(member)                .build();        petRepository.save(pet);    }    @Override    public void modifyPet(int petId, PetRequest petRequest) {        Pet pet = petRepository.findByPetId(petId)                .orElseThrow(() -> new NoSuchElementException("반려동물 정보가 없습니다."));        pet.modifyPet(petRequest);    }    @Override    public void removePet(int petId) {         petRepository.findByMemberEmail(getCurrentEmail())             .orElseThrow(() -> new NoSuchElementException("해당 회원의 반려동물이 아닙니다."));        petRepository.deleteById(petId);    }    @Override    public void modifyMbtiInfo(int petId, Mbti mbti) {        petRepository.updateMbtiBy(petId, mbti);    }    /**     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 이메일 추출     * @return String : 이메일     */    private String getCurrentEmail() {        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();        UserDetails principal = (UserDetails) authentication.getPrincipal();        log.info("principal : {}", principal.getUsername());        return principal.getUsername();    }}