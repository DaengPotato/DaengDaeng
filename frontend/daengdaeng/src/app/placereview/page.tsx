'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import styles from './index.module.scss';
import KeywordCheckboxList from './KeywordCheckboxList';
import ReviewScore from './ReviewScore';
import PetCheckboxList from '../placerecommendation/PlaceRecommendation/PetCheckboxList';

import type { PetSimple } from '@/src/types/pet';
import type { PlaceWithReview } from '@/src/types/place';

import { createReview } from '@/src/apis/api/review';
import Button from '@/src/components/common/Button';
import useFetcher from '@/src/hooks/useFetcher';

const PlaceReviewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id') as string;

  const { data: currentPlace, mutate: mutateCurrentPlace } =
    useFetcher<PlaceWithReview>(`/place`, typeof id !== 'undefined', `/${id}`);

  const { data: pets } = useFetcher<PetSimple[]>(`/pet`);
  const [checkedPets, setCheckedPets] = useState<number[]>([]);
  const [score, setScore] = useState<number>(3);
  const [checkedKeywords, setCheckedKeywords] = useState<number[]>([]);

  useEffect(() => {
    if (pets) {
      setCheckedPets(pets.map((pet) => pet.petId));
    }
  }, [pets]);

  const handleClickAddReview = async () => {
    const res = await createReview(id, {
      petList: checkedPets,
      score: score,
      keywordList: checkedKeywords,
    });

    if (res.ok) {
      await mutateCurrentPlace();
      router.push('/placesearch');
    }
  };

  console.log(checkedPets);

  return (
    <div className={styles.backgroundContainer}>
      <div>
        <div className={styles.title}>{currentPlace?.place.title}</div>
        <div className={styles.address}>{currentPlace?.place.roadAddress}</div>
      </div>
      <div>
        <ReviewScore score={score} setScore={setScore} />
      </div>
      <div>
        <div className={styles.content}>
          이 곳을 좋아한 강아지를 선택해 주세요
        </div>
        <div>
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
        <div className={styles.content}>
          이 곳에 맞는 키워드를 선택해 주세요
        </div>
        <div>
          {currentPlace?.keywordList && (
            <KeywordCheckboxList
              keywords={currentPlace.keywordList}
              checkedKeywords={checkedKeywords}
              setCheckedKeywords={setCheckedKeywords}
            />
          )}
        </div>
      </div>
      <div className={styles.submit}>
        <Button
          size={'small'}
          backgroundColor={'orange'}
          icon={true}
          onClick={handleClickAddReview}
        >
          등록
        </Button>
      </div>
    </div>
  );
};

export default PlaceReviewPage;
