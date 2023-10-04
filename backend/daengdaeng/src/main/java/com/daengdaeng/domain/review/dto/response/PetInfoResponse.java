package com.daengdaeng.domain.review.dto.response;

import com.daengdaeng.domain.pet.domain.Pet;
import lombok.Getter;

@Getter
public class PetInfoResponse {

    private int petId;

    private String name;

    public PetInfoResponse from(Pet pet) {
        PetInfoResponse petInfoResponse = new PetInfoResponse();
        petInfoResponse.petId = pet.getPetId();
        petInfoResponse.name = pet.getName();

        return petInfoResponse;
    }
}
