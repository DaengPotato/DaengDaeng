package com.daengdaeng.domain.place.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.HeartRepository;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.pet.dto.response.PetResponse;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.KeywordDto;
import com.daengdaeng.domain.place.dto.ReviewDto;
import com.daengdaeng.domain.place.dto.response.FindAllPlaceResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceDetailResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;
import com.daengdaeng.domain.place.repository.PlaceRepository;
import com.daengdaeng.domain.review.domain.Keyword;
import com.daengdaeng.domain.review.domain.Review;
import com.daengdaeng.domain.review.repository.KeywordRepository;
import com.daengdaeng.domain.review.repository.ReviewKeywordRepository;
import com.daengdaeng.domain.review.repository.ReviewRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@AllArgsConstructor
public class PlaceServiceImpl implements PlaceService {

	private final PlaceRepository placeRepository;
	private final HeartRepository heartRepository;
	private final MemberRepository memberRepository;
	private final ReviewRepository reviewRepository;
	private final KeywordRepository keywordRepository;
	private final ReviewKeywordRepository reviewKeywordRepository;

	@Override
	public FindAllPlaceResponse placeList(Byte category, String keyword, int cursor) {

		Member member = memberRepository.findByEmail(getCurrentEmail())
			.orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

		Pageable pageable = PageRequest.of(cursor, 20); // 2페이지, 페이지 크기 20
		List<Place> findPlaceList = placeRepository.findByKeywordAndCategory(keyword, category, pageable);
		List<FindPlaceResponse> findPlaceResponseList = new ArrayList<>();

		for(Place findPlace : findPlaceList){
			FindPlaceResponse findPlaceRespons = findPlaceInformation(member.getMemberId(), findPlace);
			findPlaceResponseList.add(findPlaceRespons);
		}

		int nextCursor = cursor +1;
		if(findPlaceList.size()<20) nextCursor = -1;

		FindAllPlaceResponse findAllPlaceResponse = new FindAllPlaceResponse(findPlaceResponseList, nextCursor);

		return findAllPlaceResponse;
	}

	@Override
	public FindPlaceDetailResponse placeDetail(int placeId) {

		Member member = memberRepository.findByEmail(getCurrentEmail())
			.orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));


		Place place = placeRepository.findPlaceByPlaceId(placeId)
			.orElseThrow(() -> new NoSuchElementException("장소 정보가 없습니다."));

		FindPlaceResponse findPlaceResponse = findPlaceInformation(member.getMemberId(), place);

		Double score = 0.0;
		Optional<Double> averageScore = reviewRepository.findAverageScoreByPlaceId(placeId);
		if (averageScore.isPresent()) {
			score = averageScore.get();
		}

		List<KeywordDto> keywordDtoList = new ArrayList<>();
		List<Keyword> keywordList = keywordRepository.findByCategoryCategoryId(place.getCategory().getCategoryId());
		for(Keyword keyword : keywordList){
			int keywordCnt = reviewKeywordRepository.countByReviewPlacePlaceIdAndKeywordKeywordId(placeId,keyword.getKeywordId());
			KeywordDto keywordDto = new KeywordDto(keyword.getKeywordId(), keyword.getKeyword(), keywordCnt);
			keywordDtoList.add(keywordDto);
		}

		List<ReviewDto> reviewDtoList = new ArrayList<>();
		List<Review> reviewList = reviewRepository.findByPlacePlaceId(placeId);
		reviewList.forEach(review -> {
			ReviewDto reviewDto = new ReviewDto(review.getReviewContent(), review.getRegistTime());
			reviewDtoList.add(reviewDto);
		});

		FindPlaceDetailResponse findPlaceDetailResponse = new FindPlaceDetailResponse(findPlaceResponse, score, keywordDtoList, reviewDtoList);

		return findPlaceDetailResponse;

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

	private String getCurrentEmail() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetails principal = (UserDetails) authentication.getPrincipal();
		return principal.getUsername();
	}

}
