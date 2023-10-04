'use client';

import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { SearchIcon } from '@/public/icons';
import Button from '@/src/components/common/Button';
import ErrorMessage from '@/src/components/ErrorMessage';
import { getUser } from '@/src/hooks/useLocalStorage';
import { white } from '@/src/styles/colors';
import { ssurround } from '@/src/styles/fonts';

import styles from './index.module.scss';
import CategoryCarousel from '../CategoryCarousel';
import PlaceListCard from '../PlaceListCard';

import type { Category } from '@/src/types/category';
import type { Place } from '@/src/types/place';

type InfoRegistFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sendResult: (categoryId: number, placeId: number) => void;
};

const InfoRegistForm = ({ setIsOpen, sendResult }: InfoRegistFormProps) => {
  const token: string | undefined = getUser();

  const [categorys, setCategorys] = useState<Category[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [nextCursor, setNextCursor] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line no-null/no-null
  const listRef = useRef<HTMLDivElement>(null);

  // 입력된 정보
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [placeId, setPlaceId] = useState<number>(-1);
  const [keyword, setKeyword] = useState<string>('');

  const originMessage = '선택하지 않으면 장소가 기록되지 않습니다';
  const [message, setMessage] = useState<string>(originMessage);
  const [isMsgVisible, setIsMsgVisible] = useState<boolean>(false);
  const [isMsgWarning, setIsMsgWarning] = useState<boolean>(false);
  // 메세지 리셋 함수
  const resetMessage = () => {
    setMessage('message');
    setIsMsgVisible(false);
  };

  // 메세지 설정 함수
  const updateMessage = (message: string, isWarning: boolean) => {
    setMessage(message);
    setIsMsgVisible(true);
    setIsMsgWarning(isWarning);
  };

  // 장소 리스트 리셋 함수
  const resetList = () => {
    setPlaces([]);
  };

  // 카테고리 요청 api
  const getCategoriesApi = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/place/category`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error('카테고리 조회 실패');
    }
    const data = JSON.parse(await response.text());
    setCategorys(data);
  };

  // 장소 요청 api
  const getPlacesApi = async (cursor: number, isClicked: boolean) => {
    setIsLoading(true);
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/place?category=${categoryId}&keyword=${keyword}&cursor=${
        cursor ? cursor : 1
      }`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('장소 조회 실패');
    }
    const data = JSON.parse(await response.text());
    if (isClicked) {
      setPlaces([...data.placeList]);
    }
    if (!isClicked) {
      setPlaces([...places, ...data.placeList]);
    }

    setNextCursor(data.nextCursor);
    setIsLoading(false);
    return data;
  };

  // 카테고리 버튼 선택 시 처리
  const handleCategorySelect = (selectedCategoryId: number) => {
    if (selectedCategoryId === categoryId) {
      setCategoryId(-1);
    } else {
      setCategoryId(selectedCategoryId);
    }
  };

  // 키워드 변화 시 처리
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newKeyword = newText.replace(/\s/g, '');
    setKeyword(newKeyword);
  };

  // 검색 버튼 클릭 시 처리
  const handleSearchClick = async () => {
    if (categoryId === -1) {
      updateMessage('카테고리를 선택해주세요', true);
      return;
    }
    const data = await getPlacesApi(1, true);
    if (data.placeList.length === 0) {
      updateMessage('검색 결과가 없습니다', false);
      return;
    }
    updateMessage('선택하지 않으면 장소가 기록되지 않습니다', false);
  };

  // 장소 목록 스크롤 시 처리
  const handleOnScroll = () => {
    if (isLoading) return;
    if (nextCursor === -1) return;
    const placeList = listRef.current;

    if (!placeList) return;
    const scrollTop = placeList.scrollTop;
    const scrollHeight = placeList.scrollHeight;
    const clientHeight = placeList.clientHeight;

    // 스크롤이 하단에 도달하면 추가 데이터 로드
    if (scrollHeight - clientHeight - 1 < scrollTop && !isLoading) {
      getPlacesApi(nextCursor, false);
    }
  };

  // 장소 목록 클릭 시 처리
  const handleListCardClick = (selectedPlace: Place) => {
    if (selectedPlace.placeId === placeId) {
      setPlaceId(-1);
      updateMessage('선택하지 않으면 장소가 기록되지 않습니다', false);
    } else {
      setPlaceId(selectedPlace.placeId);
      updateMessage(`${selectedPlace.title} 선택되었습니다`, false);
    }
  };

  // 취소 버튼 클릭 시 처리
  const handleCancelClick = () => {
    setIsOpen(false);
  };

  // 완료 버튼 클릭 시 처리
  const handleFinishClick = () => {
    sendResult(categoryId, placeId);
    setIsOpen(false);
  };

  // 최초 렌더링시 실행
  useEffect(() => {
    getCategoriesApi();
  }, []);

  // 카테고리 수정 시 실행
  useEffect(() => {
    resetMessage();
    resetList();
    setPlaceId(-1);
  }, [categoryId]);

  return (
    <div className={styles.InfoRegistForm}>
      <div className={styles.TitleText}>어디에서 찍으셨나요?</div>
      <div className={styles.categoryContainer}>
        <div className={styles.Text}>카테고리</div>
        <div className={styles.categoryContainer}>
          <CategoryCarousel
            selectedCategoryId={categoryId}
            categorys={categorys}
            options={{ dragFree: true, containScroll: 'trimSnaps' }}
            handleCategorySelect={handleCategorySelect}
          />
        </div>
      </div>

      <div className={styles.SearchContainer}>
        <input
          type="text"
          value={keyword}
          placeholder="검색 키워드를 입력해주세요"
          onChange={handleKeywordChange}
          className={`${styles.KeywordInput} ${ssurround.className}`}
        />
        <button onClick={handleSearchClick} className={styles.SearchButton}>
          <SearchIcon width={20} height={20} fill={white} />
        </button>
      </div>

      <div
        ref={listRef}
        onScroll={handleOnScroll}
        className={styles.PlaceResultContainer}
      >
        {places.map((item) => (
          <PlaceListCard
            key={item.placeId}
            placeName={item.title}
            placeAddress={item.roadAddress}
            backgroundColor={placeId === item.placeId ? 'orange' : 'white'}
            onClick={() => handleListCardClick(item)}
          />
        ))}
      </div>
      <div className={styles.MessageContainer}>
        {isMsgVisible ? (
          isMsgWarning ? (
            <ErrorMessage>{message}</ErrorMessage>
          ) : (
            <div className={styles.AlarmText}>{message}</div>
          )
        ) : undefined}
      </div>
      <div className={styles.buttons}>
        <Button
          type="button"
          size="small"
          backgroundColor="gray"
          onClick={handleCancelClick}
          icon={false}
        >
          취소
        </Button>
        <Button
          size="small"
          backgroundColor="orange"
          onClick={handleFinishClick}
          icon={false}
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default InfoRegistForm;
