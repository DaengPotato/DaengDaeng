package com.daengdaeng.domain.place.service;

import java.util.List;

import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.stereotype.Service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.place.dto.response.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.dto.response.FindPlaceResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

	private final MemberRepository memberRepository;
	@Override
	public List<FindPlaceByDogResponse> recommendPlaceByPet() {

		// String email= getCurrentId();
		String email  = "";
		Member member = memberRepository.findMemberByEmail(email);
		int memberId = member.getMemberId();

		return null;
	}

	@Override
	public List<FindPlaceResponse> recommendPlaceByMember() {
		// String email= getCurrentId();
		String email  = "";
		Member member = memberRepository.findMemberByEmail(email);
		int memberId = member.getMemberId();


		return null;
	}

	// private String getCurrentId() {
	// 	Neo4jProperties.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	// 	UserDetails principal = (UserDetails) authentication.getPrincipal();
	// 	return principal.getUsername();
	// }



}
