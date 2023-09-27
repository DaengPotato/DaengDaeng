import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

import type { PetDetail } from '@/src/types/pet';
import type { Place } from '@/src/types/place';

import PlaceExample from '@/public/images/place-example.jpg';
import PlaceCarousel from '@/src/components/PlaceCarousel';
import { mbtiTypes } from '@/src/constants/mbti';

type MBTIResultProps = {
  pet: PetDetail;
  selectedTypes: string[];
};

const MBTIResult = ({ pet, selectedTypes }: MBTIResultProps) => {
  const typeCounts = selectedTypes.reduce(
    (counts: { [key: string]: number }, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    },
    {},
  );

  const mbti = mbtiTypes.reduce((acc: string[], types: string[]) => {
    if (typeCounts[types[0]] > 1) acc.push(types[0]);
    else acc.push(types[1]);
    return acc;
  }, []);

  return (
    <div className={styles.MBTIResult}>
      <div className={styles.mbti}>{mbti.join('')}</div>
      <div className={styles.petImage}>
        <Image src={pet.image} width={100} height={100} alt="pet Image" />
      </div>
      <div className={styles.mbtiRatioList}>
        {mbtiTypes.map((types, i) => {
          const count: number = typeCounts[types[0]];
          let widthClass: string;

          if (count === 1) widthClass = styles.oneThird;
          else if (count === 2) widthClass = styles.twoThirds;
          else widthClass = styles.full;

          console.log(types[0], count, widthClass);

          return (
            <div className={styles.mbtiRatio} key={i}>
              <span
                className={`${styles.type} ${
                  count > 1 ? `${styles.selected}` : ''
                }`}
              >
                {types[0]}
              </span>
              <div className={styles.progress}>
                <div
                  className={`${styles.progressBar} ${widthClass} ${
                    count > 1 ? `${styles.left}` : ''
                  }`}
                ></div>
              </div>
              <span
                className={`${styles.type} ${
                  count > 1 ? '' : `${styles.selected}`
                }`}
              >
                {types[1]}
              </span>
            </div>
          );
        })}
      </div>
      {/* <div>
        <div className={styles.placeRecommendHeader}>
          <span className={styles.title}>
            {mbti.join('')} 성향의 친구들이 좋아한 곳
          </span>
          <button className={styles.moreBtn}>더보기</button>
        </div>
        <PlaceCarousel
          places={places}
          options={{ dragFree: true, containScroll: 'trimSnaps' }}
        />
      </div> */}
    </div>
  );
};

export default MBTIResult;

// dummy data
const places = Array.from({ length: 20 }, (_, i): Place => {
  return {
    placeId: i,
    title: `Place ${i}`,
    roadAddress: `Address ${i}`,
    placeImage: PlaceExample,
    isHeart: true,
    jibunAddress: '',
    homepage: [],
    openingHour: [],
    phoneNumber: '',
    content: '',
    heartCnt: 0,
    category: '',
  };
});
