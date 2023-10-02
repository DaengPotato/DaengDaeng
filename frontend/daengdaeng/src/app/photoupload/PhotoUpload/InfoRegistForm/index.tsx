'use client';

import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import { AddIcon } from '@/public/icons';
import Button from '@/src/components/common/Button';
import { white } from '@/src/styles/colors';

import styles from './index.module.scss';
import PlaceListCard from '../PlaceListCard';

import type { Category } from '@/src/types/category';
import type { Place } from '@/src/types/place';

type InfoRegistFormProps = {
  isPublic: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoRegistForm = ({ isPublic, setIsOpen }: InfoRegistFormProps) => {
  // 더미. api로 목록 받아올 것
  const categoryArray: Category[] = [
    { categoryId: 1, category: '약국' },
    { categoryId: 2, category: '숙소' },
    { categoryId: 3, category: '병원' },
    { categoryId: 4, category: '여행지' },
  ];

  // 더미. api로 목록 받아올 것
  const placeArray: Place[] = [
    {
      placeId: 1,
      title: '장소01',
      roadAddress: '경기도 화성시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
    {
      placeId: 2,
      title: '장소02',
      roadAddress: '경기도 수원시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
    {
      placeId: 3,
      title: '장소03',
      roadAddress: '경기도 화성시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
    {
      placeId: 4,
      title: '장소04',
      roadAddress: '경기도 파주시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
    {
      placeId: 5,
      title: '장소05',
      roadAddress: '경기도 수원시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
    {
      placeId: 6,
      title: '장소06',
      roadAddress: '경기도 파주시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
    {
      placeId: 7,
      title: '장소07',
      roadAddress: '경기도 수원시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
    {
      placeId: 8,
      title: '장소08',
      roadAddress: '경기도 화성시 무슨군',
      jibunAddress: '',
      homepage: [''],
      openingHour: [''],
      phoneNumber: '',
      category: '숙소',
      content: '',
      heartCnt: 1,
      placeImage: '',
      isHeart: false,
    },
  ];

  const [categoryId, setCategoryId] = useState<number>(-1);

  const [placeId, setPlaceId] = useState<number>(-1);
  const [keyword, setKeyword] = useState<string>('');

  // 카테고리 버튼 선택 시 처리
  const handleCategorySelect = (selectedCategoryId: number) => {
    if (selectedCategoryId === categoryId) {
      setCategoryId(-1);
    } else {
      setCategoryId(selectedCategoryId);
    }

    // setIsOpen(false);
  };

  // 키워드 변화 시 처리
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newKeyword = newText.replace(/\s/g, '');
    setKeyword(newKeyword);
  };

  // 검색 버튼 클릭 시 처리
  const handleSearchClick = () => {
    // setIsOpen(false);
  };

  // 장소 목록 클릭 시 처리
  const handleListCardClick = (selectedPlaceId: number) => {
    if (selectedPlaceId === placeId) {
      setPlaceId(-1);
    } else {
      setPlaceId(selectedPlaceId);
    }
  };

  // 취소 버튼 클릭 시 처리
  const handleCancelClick = () => {
    setIsOpen(false);
  };

  // 완료 버튼 클릭 시 처리
  const handleFinishClick = () => {
    isPublic;
    // setIsOpen(false);
  };

  return (
    <div className={styles.InfoRegistForm}>
      <div className={styles.Text}>위치를 추가해 주세요</div>
      <div className={styles.categoryContainer}>
        <div className={styles.Text}>카테고리 선택</div>
        <div className={styles.buttons}>
          {categoryArray.map((item) => (
            <Button
              key={item.categoryId}
              type="button"
              size="small"
              backgroundColor={
                categoryId === item.categoryId ? 'orange' : 'gray'
              }
              onClick={() => {
                handleCategorySelect(item.categoryId);
              }}
              icon={false}
            >
              {item.category}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.SearchContainer}>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          className={styles.KeywordInput}
        />
        <button onClick={handleSearchClick} className={styles.AddButton}>
          <AddIcon width={20} height={20} fill={white} />
        </button>
      </div>

      <div className={styles.PlaceResultContainer}>
        {placeArray.map((item) => (
          <PlaceListCard
            key={item.placeId}
            placeName={item.title}
            placeAddress={item.roadAddress}
            backgroundColor={placeId === item.placeId ? 'orange' : 'white'}
            onClick={() => handleListCardClick(item.placeId)}
          />
        ))}
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
