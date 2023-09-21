package com.daengdaeng.domain.place.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecommendService {

    private final RestTemplate restTemplate;

    public RecommendService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getDataFromFlask() {
        String flaskUrl = "http://127.0.0.1:5000/test";
        ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            return "Error: " + response.getStatusCodeValue();
        }
    }


}
