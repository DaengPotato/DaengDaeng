import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

import type { PetDetail } from '@/src/types/pet';
import type { PetSpecificPlaces } from '@/src/types/place';

import { PawIcon } from '@/public/icons';
import { updateMBTI } from '@/src/apis/api/mbti';
import PlaceCarousel from '@/src/components/PlaceCarousel';
import { mbtiTypes } from '@/src/constants/mbti';
import useFetcher from '@/src/hooks/useFetcher';
import { gray } from '@/src/styles/colors';

type MBTIResultProps = {
  pet: PetDetail;
  selectedTypes: string[];
};

const MBTIResult = ({ pet, selectedTypes }: MBTIResultProps) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const [mbti, setMbti] = useState<string[]>([]);

  const { data: petPlaces, mutate: mutatePlaces } = useFetcher<
    PetSpecificPlaces[]
  >(`/place/recommend/dog`, mbti.length > 0);

  const typeCounts = selectedTypes.reduce(
    (counts: { [key: string]: number }, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    },
    {},
  );

  useEffect(() => {
    (async () => {
      const mbtiType = mbtiTypes.reduce((acc: string[], types: string[]) => {
        if (typeCounts[types[0]] > 1) acc.push(types[0]);
        else acc.push(types[2]);
        return acc;
      }, []);

      setMbti(mbtiType);

      await updateMBTI(pet.petId, {
        mbti: mbtiType.join(''),
      });
    })();
  }, []);

  return (
    <div className={styles.MBTIResult}>
      <div className={styles.petMbti}>
        <div className={styles.mbti}>{mbti.join('')}</div>
        <div className={styles.petImage}>
          {!imgError && typeof pet.image === 'string' ? (
            <Image
              src={pet.image}
              alt="pet img"
              width={120}
              height={120}
              blurDataURL={pet.image}
              placeholder="blur"
              onError={() => setImgError(true)}
            />
          ) : (
            <PawIcon fill={gray} width={100} height={100} />
          )}
        </div>
        <div className={styles.mbtiRatioList}>
          {mbtiTypes.map((types, i) => {
            const count: number = typeCounts[types[0]];
            let widthClass: string;

            if (count === 1) widthClass = styles.oneThird;
            else if (count === 2) widthClass = styles.twoThirds;
            else widthClass = styles.full;

            return (
              <div className={styles.mbtiRatio} key={i}>
                <div>
                  <div
                    className={`${styles.type} ${
                      count > 1 ? `${styles.selected}` : ''
                    }`}
                  >
                    {types[0]}
                  </div>
                  <div
                    className={`${styles.typeDetail} ${
                      count > 1 ? `${styles.selected}` : ''
                    }`}
                  >
                    {types[1]}
                  </div>
                </div>
                <div className={styles.progress}>
                  <div
                    className={`${styles.progressBar} ${widthClass} ${
                      count > 1 ? `${styles.left}` : ''
                    }`}
                  ></div>
                </div>
                <div>
                  <div
                    className={`${styles.type} ${
                      count > 1 ? '' : `${styles.selected}`
                    }`}
                  >
                    {types[2]}
                  </div>
                  <div
                    className={`${styles.typeDetail} ${
                      count > 1 ? '' : `${styles.selected}`
                    }`}
                  >
                    {types[3]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.placeRecommendation}>
        <div className={styles.placeRecommendHeader}>
          <span className={styles.title}>
            {mbti.join('')} 성향의 친구들이 좋아한 곳
          </span>
          <button className={styles.moreBtn}>더보기</button>
        </div>
        {petPlaces &&
          petPlaces.map((petPlace) => {
            if (petPlace.petId === pet.petId) {
              return (
                <PlaceCarousel
                  key={pet.petId}
                  places={petPlace.placeList}
                  options={{
                    dragFree: true,
                    align: 'center',
                    containScroll: false,
                  }}
                  mutate={mutatePlaces}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default MBTIResult;
