package com.daengdaeng.domain.review.service;

import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.pet.domain.Pet;
import com.daengdaeng.domain.pet.repository.PetRepository;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.repository.PlaceRepository;
import com.daengdaeng.domain.review.domain.*;
import com.daengdaeng.domain.review.dto.request.ReviewRequest;
import com.daengdaeng.domain.review.dto.response.ReviewResponse;
import com.daengdaeng.domain.review.repository.KeywordRepository;
import com.daengdaeng.domain.review.repository.ReviewKeywordRepository;
import com.daengdaeng.domain.review.repository.ReviewPetRepository;
import com.daengdaeng.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final MemberRepository memberRepository;
    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewKeywordRepository reviewKeywordRepository;
    private final ReviewPetRepository reviewPetRepository;
    private final KeywordRepository keywordRepository;
    private final PetRepository petRepository;


    // 후기 작성 - 만족하는 pet저장
    public void addReviewPet(int reviewId, List<Integer> petList){
        for(Integer petId : petList) {
            Pet pet = petRepository.findByPetId(petId).orElseThrow(NoSuchElementException::new);
            ReviewPet reviewpet = ReviewPet.builder()
                    .reviewPetId(ReviewPetId.builder()
                            .reviewId(reviewId)
                            .petId(pet.getPetId())
                            .build())
                    .build();
            reviewPetRepository.save(reviewpet);
        }
    }

    // 후기 작성 - 리뷰 키워드 저장
    public void addReviewKeyword(int reviewId, List<Integer> keywordList){
        for(Integer keywordId : keywordList){
            Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(NoSuchElementException::new);
            ReviewKeyword reviewKeyword = ReviewKeyword.builder()
                    .reviewKeywordId(ReviewKeywordId.builder()
                            .keywordId(keyword.getKeywordId())
                            .reviewId(reviewId)
                            .build())
                    .build();
            reviewKeywordRepository.save(reviewKeyword);
        }
    }

    // 후기 작성
    @Override
    public void addReview(ReviewRequest reviewRequest, int placeId){
        Member member = memberRepository.findByEmail(getCurrentEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));
        Place place = placeRepository.findPlaceByPlaceId(placeId).orElseThrow(NoSuchElementException::new);
        List<Integer> petList = reviewRequest.getPetList();
        List<Integer> keywordList = reviewRequest.getKeywordList();
        byte score = reviewRequest.getScore();
        String reviewContent = reviewRequest.getReviewContent();
        Review review = Review.builder()
                .member(member)
                .place(place)
                .score(score)
                .registTime(new Date())
                .reviewContent(reviewContent)
                .build();
        reviewRepository.save(review);
        int reviewId = review.getReviewId();
        addReviewPet(reviewId, petList);
        addReviewKeyword(reviewId, keywordList);

    }

    // 후기 수정 - 만족하는 pet 수정
    public void modifyReviewPet(Review review, List<Integer> petList){
        for(Integer petId : petList){
            Pet pet = petRepository.findByPetId(petId).orElseThrow(NoSuchElementException::new);
            ReviewPet reviewPet = reviewPetRepository.findByReview(review);
            reviewPet.modifyReviewPet(pet);
        }
    }

    // 후기 수정 - 리뷰 키워드 수정
    public void modifyReviewKeyword(Review review, List<Integer> keywordList){
        for(Integer keywordId : keywordList){
            Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(NoSuchElementException::new);
            ReviewKeyword reviewKeyword = reviewKeywordRepository.findByReview(review);
            reviewKeyword.modifyKeyword(keyword);
        }
    }


    // 후기 수정
    @Override
    public void modifyReview(ReviewRequest reviewRequest, int reviewId){
        Member member = memberRepository.findByEmail(getCurrentEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));
        Review review = reviewRepository.findByReviewId(reviewId).orElseThrow(NoSuchElementException::new);
        List<Integer> petList = reviewRequest.getPetList();
        List<Integer> keywordList = reviewRequest.getKeywordList();
        if (review.getMember().equals(member)){
            review.modifyReview(reviewRequest);
            modifyReviewPet(review, petList);
            modifyReviewKeyword(review, keywordList);
        }
    }


    // 후기 삭제
    @Override
    public void removeReview(int reviewId){
        Member member = memberRepository.findByEmail(getCurrentEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));
        Review review = reviewRepository.findByReviewId(reviewId).orElseThrow(NoSuchElementException::new);
        if (review.getMember().equals(member)){
            List<ReviewPet> reviewPets= reviewPetRepository.findAllByReview(review);
            List<ReviewKeyword> reviewKeywords = reviewKeywordRepository.findAllByReview(review);
            reviewPetRepository.deleteAll(reviewPets);
            reviewKeywordRepository.deleteAll(reviewKeywords);
            reviewRepository.deleteById(reviewId);
        }
    }


    // member별 작성한 후기 리스트
    @Override
    public List<ReviewResponse> findReviewList(){
        Member member = memberRepository.findByEmail(getCurrentEmail())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));
        List<Review> reviews = reviewRepository.findByMember(member);
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for (Review review : reviews) {
            reviewResponses.add(new ReviewResponse().from(review));
        }
        return reviewResponses;
    }



    private String getCurrentEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

}
