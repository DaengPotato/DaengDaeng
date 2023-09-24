package com.daengdaeng.domain.place.service;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.HeartRepository;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.response.FindAllPlaceResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;
import com.daengdaeng.domain.place.repository.PlaceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@AllArgsConstructor
public class PlaceServiceImpl implements PlaceService {

	private final PlaceRepository placeRepository;
	private final HeartRepository heartRepository;
	private final MemberRepository memberRepository;

	@Override
	public FindAllPlaceResponse placeList(Byte category, String keyword, int cursor) {

		int memberId = 1;

		Pageable pageable = PageRequest.of(cursor, 20); // 2페이지, 페이지 크기 20
		List<Place> findPlaceList = placeRepository.findByKeywordAndCategory(keyword, category, pageable);
		List<FindPlaceResponse> findPlaceResponseList = new ArrayList<>();

		for(Place findPlace : findPlaceList){
			FindPlaceResponse findPlaceRespons = findPlaceInformation(memberId, findPlace);
			findPlaceResponseList.add(findPlaceRespons);
		}

		int nextCursor = cursor +1;
		if(findPlaceList.size()<20) nextCursor = -1;

		FindAllPlaceResponse findAllPlaceResponse = new FindAllPlaceResponse(findPlaceResponseList, nextCursor);

		return findAllPlaceResponse;
	}

	private FindPlaceResponse findPlaceInformation(int memberId, Place place){


		boolean isHeart = heartRepository.existsByMemberMemberIdAndPlacePlaceId(memberId, place.getPlaceId());

		int heartCnt = heartRepository.countByPlacePlaceId(place.getPlaceId());

		String category = place.getCategory().getCategory();

		List<String> homepage = new ArrayList<>();
		List<String> openingHour = new ArrayList<>();
		try {

			ObjectMapper objectMapper = new ObjectMapper();

			String homepageListJson = place.getHomepage();
			// List<String> homepageList = objectMapper.readValue(homepageListJson, new TypeReference<List<String>>() {});
			// homepage = homepageList;


			String openingHourListListJson = place.getOpeningHour();
			// List<String> openingHourList = objectMapper.readValue(openingHourListListJson, new TypeReference<List<String>>() {});
			// openingHour = openingHourList;

		}catch (Exception  e){
			e.printStackTrace();
		}


		FindPlaceResponse findPlaceResponse =  new FindPlaceResponse(
			place.getPlaceId(), place.getTitle(), place.getJibunAddress(),
			place.getRoadAddress(), homepage, openingHour, place.getPhoneNumber(),
			place.getContent(), heartCnt, place.getImage(), category, isHeart
		);

		return findPlaceResponse;
	}
}
