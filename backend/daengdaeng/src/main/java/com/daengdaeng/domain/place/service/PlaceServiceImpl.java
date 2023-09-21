package com.daengdaeng.domain.place.service;

import java.util.ArrayList;
import java.util.List;

import com.daengdaeng.domain.member.repository.HeartRepository;
import com.daengdaeng.domain.pet.repository.PetRepository;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.flask.PlaceForDogResponse;
import com.daengdaeng.domain.place.dto.flask.PlaceForMemberResponse;
import com.daengdaeng.domain.place.repository.PlaceRespository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.place.dto.response.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

	private final MemberRepository memberRepository;
	private final PlaceRespository placeRespository;
	private final HeartRepository heartRepository;
	private final PetRepository petRepository;
	private final RestTemplate restTemplate;

	public List<PlaceForDogResponse> flaskGetPlaceForDogData() {
		ResponseEntity<List<PlaceForDogResponse>> responseEntity = restTemplate.exchange(
				"http://127.0.0.1:5000/recom/byMbti",
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<List<PlaceForDogResponse>>() {}
		);

		List<PlaceForDogResponse> placeForDogResponseList = responseEntity.getBody();
		return placeForDogResponseList;
	}

	@Override
	public List<FindPlaceByDogResponse> recommendPlaceByPet() {

		List<FindPlaceByDogResponse> findPlaceByDogResponseList = new ArrayList<>();

		// String email= getCurrentId();
		String email  = "";
		Member member = memberRepository.findMemberByEmail(email);
		int memberId = member.getMemberId();

//		String flaskUrl = "http://127.0.0.1:5000/recom/byMbti";
//		List<PlaceForDogResponse> placeForDogResponseList =  restTemplate.getForObject(flaskUrl,PlaceForDogResponse.class);
//		PlaceForDogResponse[] placeForDogResponseList = restTemplate.getForObject(flaskUrl, PlaceForDogResponse[].class);

		List<PlaceForDogResponse> getPlaceForDogDataList = flaskGetPlaceForDogData();



		for (PlaceForDogResponse placeForDogResponse : getPlaceForDogDataList){

			int petId = placeForDogResponse.getPetId();
			List<Integer> recommendPlaceList = placeForDogResponse.getRecommendPlaceList();
			List<FindPlaceResponse> placeList = new ArrayList<>();
			for (int placeId :  recommendPlaceList){
				int heartCnt = heartRepository.countByPlaceId(placeId);
				boolean isHeart = heartRepository.existsByMemberIdAndPlaceId(memberId, placeId);
				Place place = placeRespository.findPlaceByPlaceId(placeId);
				String category = place.getCategory().getCategory();

				List<String> homepage = new ArrayList<>();
				List<String> openingHour = new ArrayList<>();
				try {

					ObjectMapper objectMapper = new ObjectMapper();

					String homepageListJson = place.getHomepage();
					List<String> homepageList = objectMapper.readValue(homepageListJson, new TypeReference<List<String>>() {});
					homepage = homepageList;

					String openingHourListListJson = place.getHomepage();
					List<String> openingHourList = objectMapper.readValue(openingHourListListJson, new TypeReference<List<String>>() {});
					openingHour = openingHourList;

				}catch (JsonProcessingException  e){
					e.printStackTrace();
				}



				FindPlaceResponse findPlaceResponse =  new FindPlaceResponse(
						place.getPlaceId(), place.getTitle(), place.getJibunAddress(),
						place.getRoadAddress(), homepage, openingHour, place.getPhoneNumber(),
						place.getContent(), heartCnt, place.getImage(), category, isHeart
				);

				placeList.add(findPlaceResponse);

			}

			String name = petRepository.findNameByPetId(petId);
			FindPlaceByDogResponse findPlaceByDogResponse = new FindPlaceByDogResponse(petId, name, placeList);
			findPlaceByDogResponseList.add(findPlaceByDogResponse);

		}

			return findPlaceByDogResponseList;
	}

	@Override
	public List<FindPlaceResponse> recommendPlaceByMember() {
		// String email= getCurrentId();
		String email  = "";
		Member member = memberRepository.findMemberByEmail(email);
		int memberId = member.getMemberId();

		String flaskUrl = "http://127.0.0.1:5000/recom/byReviewHeart";
		PlaceForMemberResponse placeForMemberResponse =  restTemplate.getForObject(flaskUrl, PlaceForMemberResponse.class);



		return null;
	}

	// private String getCurrentId() {
	// 	Neo4jProperties.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	// 	UserDetails principal = (UserDetails) authentication.getPrincipal();
	// 	return principal.getUsername();
	// }



}
