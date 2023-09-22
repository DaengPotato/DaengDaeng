package com.daengdaeng.domain.pet.service;import com.daengdaeng.domain.member.domain.Member;import com.daengdaeng.domain.member.repository.MemberRepository;import com.daengdaeng.domain.pet.domain.Pet;import com.daengdaeng.domain.pet.dto.request.PetRequest;import com.daengdaeng.domain.pet.dto.response.PetNameResponse;import com.daengdaeng.domain.pet.repository.PetRepository;import com.daengdaeng.global.exception.UserException;import lombok.RequiredArgsConstructor;import lombok.extern.slf4j.Slf4j;import org.springframework.security.core.Authentication;import org.springframework.security.core.context.SecurityContextHolder;import org.springframework.security.core.userdetails.UserDetails;import org.springframework.stereotype.Service;import javax.transaction.Transactional;import javax.validation.Valid;import java.util.ArrayList;import java.util.List;@Slf4j@Service@RequiredArgsConstructor@Transactionalpublic class PetServiceImpl implements PetService {    private final PetRepository petRepository;    private final MemberRepository memberRepository;    @Override    public List<PetNameResponse> findPetInfo() {        Member member = memberRepository.findByEmail(getCurrentId())                .orElseThrow(() -> new UserException("존재하지 않는 사용자입니다."));        List<Pet> petList = petRepository.findByMemberId(member.getMemberId());        List<PetNameResponse> petNameResponseList = new ArrayList<>();        for (Pet pet : petList) {            PetNameResponse petNameResponse = PetNameResponse.builder()                .petId(pet.getPetId())                .name(pet.getName())                .build();            petNameResponseList.add(petNameResponse);        }        return petNameResponseList;    }    @Override    public void addPet(@Valid PetRequest petRequest) {        Member member = memberRepository.findByEmail(getCurrentId())                .orElseThrow(() -> new UserException("존재하지 않는 사용자입니다."));        if (member == null) {            throw new UserException("미로그인");        }        Pet pet = Pet.builder()                .name(petRequest.getName())                .birth(petRequest.getBirth())                .gender(petRequest.isGender())                .weight(petRequest.getWeight())                .image(petRequest.getImage())                .member(member)                .build();        petRepository.save(pet);    }    /**     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 아이디 추출     * @return String : 아이디     */    private String getCurrentId() {        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();        UserDetails principal = (UserDetails) authentication.getPrincipal();        log.info("principal : {}", principal.getUsername());        return principal.getUsername();    }}