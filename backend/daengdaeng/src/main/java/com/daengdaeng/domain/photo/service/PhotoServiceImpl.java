package com.daengdaeng.domain.photo.service;

import com.daengdaeng.domain.s3file.config.S3Config;
import com.daengdaeng.domain.s3file.dto.FileNameAndUrlResponse;
import com.daengdaeng.domain.s3file.service.S3ServiceImpl;
import com.daengdaeng.domain.member.domain.Member;
import com.daengdaeng.domain.member.repository.MemberRepository;
import com.daengdaeng.domain.photo.domain.Photo;
import com.daengdaeng.domain.photo.dto.FrameListResponse;
import com.daengdaeng.domain.photo.dto.FrameResponse;
import com.daengdaeng.domain.photo.dto.PhotoResponse;
import com.daengdaeng.domain.photo.dto.PhotoSearchResponse;
import com.daengdaeng.domain.photo.repository.PhotoRepository;
import com.daengdaeng.domain.place.domain.Place;
import com.daengdaeng.domain.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepository;
    private final MemberRepository memberRepository;
    private final PlaceRepository placeRepository;
    private final S3ServiceImpl s3Service;
    private final S3Config s3Config;
    private int pageSize = 10;

    // 모든 댕댕네컷 정보 조회
    @Override
    public PhotoSearchResponse findDaengCutsAll(int cursor) {
        // 페이저블 객체 설정 다음 커서 설정
        Pageable pageable = PageRequest.of(cursor, pageSize);
        int nextCursor = cursor + 1;

        // 페이징해서 정보 가져오기
        List<Photo> searchResult = photoRepository.findAll(pageable).getContent();

        // 마지막 페이지라면 커서 -1
        if (searchResult.size() < pageSize)
            nextCursor = -1;

        // 가져온 정보 가공해서 response 담기
        List<PhotoResponse> photoList = new ArrayList<>();
        for (Photo p : searchResult) {
            Place thisPlace = p.getPlace();
            String text = thisPlace.getTitle() + ", " + thisPlace.getJibunAddress();
            photoList.add(PhotoResponse.of(p.getImage(), text));
        }

        // 결과 반환하기
        return PhotoSearchResponse.of(photoList, nextCursor);
    }

    // memberId에 해당하는 댕댕네컷 정보 조회
    @Override
    public PhotoSearchResponse findMyDaengCuts(int cursor) {
        // 요청에서 멤버아이디 뽑기
        String userEmail = getCurrentEmail();
        Member member = memberRepository.findByEmail(userEmail).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        int memberId = member.getMemberId();

        // 페이저블 객체 설정 다음 커서 설정
        Pageable pageable = PageRequest.of(cursor, pageSize);
        int nextCursor = cursor + 1;

        // 페이징해서 정보 가져오기
        List<Photo> searchResult = photoRepository.findByMemberId(memberId, pageable).getContent();

        // 마지막 페이지라면 커서 -1
        if (searchResult.size() < pageSize)
            nextCursor = -1;

        // 가져온 정보 가공해서 response 담기
        List<PhotoResponse> photoList = new ArrayList<>();
        for (Photo p : searchResult) {
            Place thisPlace = p.getPlace();
            String text = thisPlace.getTitle() + ", " + thisPlace.getJibunAddress();
            photoList.add(PhotoResponse.of(p.getImage(), text));
        }

        // 결과 반환하기
        return PhotoSearchResponse.of(photoList, nextCursor);
    }

    // s3에서 프레임 정보 조회
    @Override
    public FrameListResponse findFrames() {
        // 반환 결과 담을 리스트
        List<FrameResponse> frameResult = new ArrayList<>();

        // s3 폴더로 검색 결과
        List<FileNameAndUrlResponse> searchResult = s3Service.getFileNameAndUrlAtFolder(s3Config.getFrameFolder());

        for (int i = 1; i < searchResult.size(); i++) {
            FileNameAndUrlResponse res = searchResult.get(i);
            frameResult.add(FrameResponse.of(res.getFileName(), res.getFileUrl()));
        }

        // 반환
        return FrameListResponse.of(frameResult);
    }

    // S3에 파일 업로드
    @Override
    public String addDaengCutWithDateAtS3(MultipartFile file) {
        // 요청에서 멤버아이디 뽑기
        String userEmail = getCurrentEmail();
        Member member = memberRepository.findByEmail(userEmail).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
        int memberId = member.getMemberId();

        String uuid = UUID.randomUUID().toString();
        String localTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));
        String newFileName = memberId + "_" + localTime + "_" + uuid;
        String savedUrl = s3Service.uploadFile(file, s3Config.getPhotoFolder(), newFileName);
        return savedUrl;
    }

    // 업로드한 댕댕네컷 파일에 대한 정보를 DB에 추가
    @Override
    public boolean addDaengCut(String imageUrl, int placeId) {
        // 요청에서 멤버 뽑기
        String userEmail = getCurrentEmail();
        Member member = memberRepository.findByEmail(userEmail).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

        Optional<Place> place = placeRepository.findById(placeId);

        Photo newPhoto = Photo.builder()
                .image(imageUrl)
                .member(member)
                .place(place.get())
                .build();

        Photo savedPhoto = photoRepository.save(newPhoto);

        return savedPhoto != null;
    }

    /**
     * 스프링 시큐리티 인증을 통과하여 저장된 회원의 인증 객체에서 이메일 추출
     *
     * @return String : 이메일
     */
    private String getCurrentEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

}
