package com.daengdaeng.domain.place.service;

import java.util.ArrayList;
import java.util.List;

// import com.daengdaeng.domain.member.repository.HeartRepository;
import com.daengdaeng.domain.pet.repository.PetRepository;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.flask.PlaceForDogResponse;
import com.daengdaeng.domain.place.dto.flask.PlaceForMemberResponse;
import com.daengdaeng.domain.place.repository.PlaceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
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
public class FlaskPlaceServiceImpl implements FlaskPlaceService {

	private final MemberRepository memberRepository;
	private final PlaceRepository placeRespository;
	// private final HeartRepository heartRepository;
	private final PetRepository petRepository;
	private final RestTemplate restTemplate;

	public List<PlaceForDogResponse> flaskGetPlaceForDogData(int memberId) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("memberId", String.valueOf(memberId)); // memberId 헤더 추가

		HttpEntity<?> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<List<PlaceForDogResponse>> responseEntity = restTemplate.exchange(
				"http://127.0.0.1:5000/recom/byMbti",
				HttpMethod.GET,
				requestEntity,
				new ParameterizedTypeReference<List<PlaceForDogResponse>>() {}
		);

		List<PlaceForDogResponse> placeForDogResponseList = responseEntity.getBody();
		return placeForDogResponseList;
	}


	public PlaceForMemberResponse flaskGetPlaceForMemberData(int memberId) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("memberId", String.valueOf(memberId)); // memberId 헤더 추가

		HttpEntity<?> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<PlaceForMemberResponse> responseEntity = restTemplate.exchange(
				"http://127.0.0.1:5000/recom/byReviewHeart",
				HttpMethod.GET,
				requestEntity,
				new ParameterizedTypeReference<PlaceForMemberResponse>() {}
		);

		PlaceForMemberResponse placeForMEmberResponseList = responseEntity.getBody();
		return placeForMEmberResponseList;
	}

	@Override
	public List<FindPlaceByDogResponse> recommendPlaceByPet() {

		List<FindPlaceByDogResponse> findPlaceByDogResponseList = new ArrayList<>();

		// String email= getCurrentId();
		// String email  = "";
		// Member member = memberRepository.findMemberByEmail(email);
		// int memberId = member.getMemberId();
		int memberId = 1;
		List<PlaceForDogResponse> getPlaceForDogDataList = flaskGetPlaceForDogData(memberId);



		for (PlaceForDogResponse placeForDogResponse : getPlaceForDogDataList){

			int petId = placeForDogResponse.getPetId();

			List<Integer> recommendPlaceList = placeForDogResponse.getRecommendPlaceList();

			List<FindPlaceResponse> placeList = new ArrayList<>();

			for (int placeId :  recommendPlaceList){

				FindPlaceResponse findPlaceResponse = findPlaceInformation(memberId, placeId);

				placeList.add(findPlaceResponse);

			}
			String name = petRepository.findByPetId(petId).getName();
			FindPlaceByDogResponse findPlaceByDogResponse = new FindPlaceByDogResponse(petId, name, placeList);
			findPlaceByDogResponseList.add(findPlaceByDogResponse);

		}
			return findPlaceByDogResponseList;
	}

	@Override
	public List<FindPlaceResponse> recommendPlaceByMember() {
		// String email= getCurrentId();
		// String email  = "";
		// Member member = memberRepository.findMemberByEmail(email);
		// int memberId = member.getMemberId();

		int memberId = 1;


		PlaceForMemberResponse getPlaceForMemberDataList = flaskGetPlaceForMemberData(memberId);

		List<FindPlaceResponse> placeList = new ArrayList<>();

		for(int placeId : getPlaceForMemberDataList.getRecommendPlaceList()){

			FindPlaceResponse findPlaceResponse = findPlaceInformation(memberId, placeId);

			placeList.add(findPlaceResponse);

		}

		return placeList;
	}

	// private String getCurrentId() {
	// 	Neo4jProperties.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	// 	UserDetails principal = (UserDetails) authentication.getPrincipal();
	// 	return principal.getUsername();
	// }

	private FindPlaceResponse findPlaceInformation(int memberId, int placeId){

		// int heartCnt = heartRepository.countByPlaceId(placeId);
		int heartCnt = 1;
		// boolean isHeart = heartRepository.existsByMemberIdAndPlaceId(memberId, placeId);
		boolean isHeart = false;
		Place place = placeRespository.findPlaceByPlaceId(placeId);
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
