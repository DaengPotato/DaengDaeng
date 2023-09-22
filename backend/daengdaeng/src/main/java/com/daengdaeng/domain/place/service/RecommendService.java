// package com.daengdaeng.domain.place.service;
//
// import com.daengdaeng.domain.place.domain.Place;
// import com.daengdaeng.domain.place.repository.PlaceRepository;
// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
//
// import java.util.*;
//
// @Service
// public class RecommendService {
//
//     private final PlaceRepository placeRepository;
//     private final RestTemplate restTemplate;
//     private final Logger log = LoggerFactory.getLogger(this.getClass());
//
//
//
//     public RecommendService(PlaceRepository placeRepository, RestTemplate restTemplate) {
//         this.placeRepository = placeRepository;
//         this.restTemplate = restTemplate;
//     }
//
//
//     public String getDataFromFlask() {
//         String flaskUrl = "http://127.0.0.1:5000/test";
//         try {
//             ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);
//
//             if (response.getStatusCode().is2xxSuccessful()) {
//                 return response.getBody();
//             } else {
//                 throw new RuntimeException("Flask 요청이 실패했습니다. 응답 코드: " + response.getStatusCodeValue());
//             }
//         } catch (Exception e) {
//             // 예외가 발생한 경우 로그에 기록
//             log.error("Flask 요청 중 오류 발생: " + e.getMessage());
//
//             throw e;
//         }
//     }
//
//     // 댕BTI 기반 추천
//     public List<Map<String, List<MemberRecommendResponse>>> getPetRecommend(int memberId) {
//         String flaskUrl = "http://127.0.0.1:5000/recom/byMbti/" + memberId;
//         try {
//             ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);
//
//             System.out.println(response);
//
//             if (response.getStatusCode().is2xxSuccessful()) {
//                 List<Map<String, List<MemberRecommendResponse>>> petRecommendations = new ArrayList<>();
//
//                 ObjectMapper objectMapper = new ObjectMapper();
//                 List<Map<String, Object>> responseData = objectMapper.readValue(response.getBody(), new TypeReference<List<Map<String, Object>>>(){});
//
//                 for (Map<String, Object> data : responseData) {
//                     int petId = (int) data.get("pet_id");
//                     List<Integer> recomPlaceList = (List<Integer>) data.get("recom_place");
//
//                     List<Place> recommendedPlaces = placeRepository.findByPlaceIdIn(recomPlaceList);
//                     List<MemberRecommendResponse> memberRecommendResponses = new ArrayList<>();
//                     for (Place place : recommendedPlaces) {
//                         memberRecommendResponses.add(new MemberRecommendResponse().from(place));
//                     }
//
//                     Map<String, List<MemberRecommendResponse>> petRecommendation = new HashMap<>();
//                     petRecommendation.put("pet_id: " + petId, memberRecommendResponses);
//                     petRecommendations.add(petRecommendation);
//                 }
//
//                 return petRecommendations;
//             } else {
//                 throw new RuntimeException("Flask 요청이 실패했습니다. 응답 코드: " + response.getStatusCodeValue());
//             }
//         } catch (Exception e) {
//             e.printStackTrace();
//             return Collections.emptyList();
//         }
//     }
//
//
//     // 사용자 찜&리뷰 기반 추천
//     public List<MemberRecommendResponse> getHashHeartRecommend(int memberId) {
//         String flaskUrl = "http://127.0.0.1:5000/recom/byReviewHeart/" + memberId;
//         try {
//             ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);
//
//             if (response.getStatusCode().is2xxSuccessful()) {
//                 ObjectMapper objectMapper = new ObjectMapper();
//                 Map<String, List<Integer>> jsonMap = objectMapper.readValue(response.getBody(), new TypeReference<Map<String, List<Integer>>>() {});
//
//                 List<Integer> recomPlaceList = jsonMap.get("recom_place");
//                 System.out.println(recomPlaceList);
//
//                 // 장소 ID 리스트를 사용하여 장소 정보를 조회
//                 List<Place> recommendedPlaces = placeRepository.findByPlaceIdIn(recomPlaceList);
//                 System.out.println(recommendedPlaces);
//                 List<MemberRecommendResponse> memberRecommendResponses = new ArrayList<>();
//                 for (Place place : recommendedPlaces) {
//                     memberRecommendResponses.add(new MemberRecommendResponse().from(place));
//                 }
//                 return memberRecommendResponses;
//             } else {
//                 throw new RuntimeException("Flask 요청이 실패했습니다. 응답 코드: " + response.getStatusCodeValue());
//             }
//         } catch (JsonProcessingException e) {
//             e.printStackTrace();
//             return Collections.emptyList();
//         }
//     }
// }
