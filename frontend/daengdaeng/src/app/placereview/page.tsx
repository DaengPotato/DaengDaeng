'use client';

import { useState } from 'react';

import useFetcher from '@/src/hooks/useFetcher';

import styles from './index.module.scss';
import PetCheckboxList from '../placerecommendation/PlaceRecommendation/PetCheckboxList';

import type { PetSimple } from '@/src/types/pet';

// type ReviewProps = {
//   id: number;
//   title: string;
//   address: string;
// };

// const PlaceReviewPage = ({ id, title, address }: ReviewProps) => {
const PlaceReviewPage = () => {
  const { data: pets } = useFetcher<PetSimple[]>(`/pet`);
  const [checkedPets, setCheckedPets] = useState<number[]>([]);

  console.log(checkedPets);

  return (
    <>
      <div className={styles.info}>
        <div>타이틀</div>
        <div>주소</div>
      </div>
      <div>{/* 별점 */}</div>
      <div>
        <div>이 곳을 좋아한 강아지를 선택해 주세요</div>
        <div>
          {/* 강아지 리스트 */}
          {pets && (
            <PetCheckboxList
              pets={pets}
              checkedPets={checkedPets}
              setCheckedPets={setCheckedPets}
            />
          )}
        </div>
      </div>
      <div>
        <div>이 곳에 맞는 키워드를 선택해 주세요</div>
        <div>{/* 키워드 리스트 */}</div>
      </div>
    </>
  );
};

export default PlaceReviewPage;
