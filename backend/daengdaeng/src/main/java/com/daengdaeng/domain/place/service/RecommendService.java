package com.daengdaeng.domain.place.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecommendService {

    private final RestTemplate restTemplate;
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    public RecommendService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public String getDataFromFlask() {
        String flaskUrl = "http://127.0.0.1:5000/test";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                throw new RuntimeException("Flask 요청이 실패했습니다. 응답 코드: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            // 예외가 발생한 경우 로그에 기록
            log.error("Flask 요청 중 오류 발생: " + e.getMessage());

            throw e;
        }
    }

    public String getPetRecommend(int memberId){

        String flaskUrl = "http://127.0.0.1:5000/recom/byMbti/" + memberId;
        try {
            System.out.println("여기?");
            ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                throw new RuntimeException("Flask 요청이 실패했습니다. 응답 코드: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            // 예외가 발생한 경우 로그에 기록
            log.error("Flask 요청 중 오류 발생: " + e.getMessage());
            throw e;
        }

    }



}
