package com.daengdaeng.domain.member.service;

import com.daengdaeng.domain.member.domain.Heart;
import com.daengdaeng.domain.member.domain.HeartId;
import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.HeartRepository;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;
import com.daengdaeng.domain.place.repository.PlaceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class HeartServiceImpl implements HeartService {

    private final MemberRepository memberRepository;
    private final HeartRepository heartRepository;
    private final PlaceRepository placeRepository;

    @Override
    public void addHeart(int placeId) {
        Member member = memberRepository.findByEmail(getCurrentEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        placeRepository.findPlaceByPlaceId(placeId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 장소입니다."));

        heartRepository.save(Heart.builder()
                .heartId(HeartId.builder()
                        .memberId(member.getMemberId())
                        .placeId(placeId)
                        .build())
                .build());
    }

    @Override
    public void removeHeart(int placeId) {
        Member member = memberRepository.findByEmail(getCurrentEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        if (!heartRepository.existsByMemberMemberIdAndPlacePlaceId(member.getMemberId(), placeId)) {
            throw new NoSuchElementException("해당 멤버가 찜한 장소 정보가 없습니다.");
        }

        heartRepository.delete(Heart.builder()
                        .heartId(HeartId.builder()
                                .memberId(member.getMemberId())
                                .placeId(placeId)
                                .build())
                .build());
    }

    @Override
    public List<FindPlaceResponse> findHeart() {
        Member member = memberRepository.findByEmail(getCurrentEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        List<Place> placeList = heartRepository.findAllByMemberId(member.getMemberId());
        List<FindPlaceResponse> findPlaceResponseList = placeList.stream()
                .map(place -> {
                    ObjectMapper objectMapper = new ObjectMapper();

                    List<String> homepage = new ArrayList<>();
                    List<List<String>> openingHour = new ArrayList<>();
                    try {
                        homepage = objectMapper.readValue(place.getHomepage(), new TypeReference<List<String>>() {});
                        openingHour = objectMapper.readValue(place.getOpeningHour(), new TypeReference<List<List<String>>>() {});
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e.getMessage());
                    }

                    return new FindPlaceResponse(
                            place.getPlaceId(),
                            place.getTitle(),
                            place.getJibunAddress(),
                            place.getRoadAddress(),
                            homepage,
                            openingHour,
                            place.getPhoneNumber(),
                            place.getContent(),
                            heartRepository.countByPlacePlaceId(place.getPlaceId()),
                            place.getImage(),
                            place.getCategory().getCategory(),
                            true
                    );
                })
                .collect(Collectors.toList());

        return findPlaceResponseList;
    }

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 이메일 추출
     * @return String : 이메일
     */
    private String getCurrentEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        log.info("principal : {}", principal.getUsername());
        return principal.getUsername();
    }

}
