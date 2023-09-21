package com.daengdaeng.domain.place.service;

import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.dto.FindPlaceByDogResponse;
import com.daengdaeng.domain.place.dto.PlaceResponse;
import com.daengdaeng.domain.place.repository.PlaceRespository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.json.Json;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {
    private final RecommendService recommendService;

    private final PlaceRespository placeRepository;

    public List<FindPlaceByDogResponse> findPlacesByPlaceIds(int memberId) {
        // 추천 데이터 JSON으로 받음
        String recommended = recommendService.getPetRecommend(memberId);

        List<FindPlaceByDogResponse> result = new ArrayList<>();
        try {

            // JSON 파싱
            JSONParser parser = new JSONParser();
            JSONArray jsonArray = (JSONArray) parser.parse(recommended);

            // 파싱된 결과 처리
            for (Object obj : jsonArray) {
                int petId;
                List<Integer> placeIds;
                List<PlaceResponse> placeList = new ArrayList<>();

                placeIds = new ArrayList<>();
                // 각 객체에 대해
                JSONObject jsonObject = (JSONObject) obj;

                // petId 파싱
                petId = ((Long) jsonObject.get("pet_id")).intValue();

                // 추천받은 place 배열 파싱
                JSONArray placeIdsArray = (JSONArray) jsonObject.get("recom_place");

                for (int i = 0; i < placeIdsArray.size(); i++) {
                    placeIds.add(((Long) placeIdsArray.get(i)).intValue());
                }

                System.out.println(petId);
                System.out.println(placeIds.toString());

                // 추천된 장소id 그룹에 해당하는 장소 정보 DB에서 조회
                List<Place> searchedPlaces=placeRepository.findByPlaceIdIn(placeIds);
//                System.out.println(searchedPlaces.toString());
//                System.out.println(searchedPlaces.get(0).getJibunAddress());

                for( Place thisPlace:searchedPlaces){
                    placeList.add(PlaceResponse.of(thisPlace,null));
                }

                result.add(FindPlaceByDogResponse.of(petId,placeList));



            }


        } catch (Exception e) {
            e.printStackTrace();
        }
//        System.out.println(recommended);

//        return placeRepository.findByPlaceIdIn(placeIds);
        return result;

    }
}
