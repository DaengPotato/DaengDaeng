'use client';
import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

import Button from '@/src/components/common/Button';

const HomePage = () => {
  function mbtiTestClick() {
    window.location.href = '/mbti';
  }

  function makePhotoClick() {
    window.location.href = '/daengphoto';
  }

  return (
    <div className={styles.HomePage}>
      <Image
        className={styles.wave}
        src="/images/main_wave.png"
        alt="파도 이미지"
        width={500}
        height={500}
        priority={true}
      />
      <div className={styles.mbti}>
        <Image
          className={styles.daenggamja}
          src="/images/travel_pet.png"
          alt="여행 이미지"
          width={200}
          height={200}
          priority={true}
        />
        <div className={styles.title}>강아지와 떠나는 여행</div>
        <div className={styles.title}>우리 강아지는 어떤 곳을 좋아할까?</div>

        <div className={styles.mbtiBtn}>
          <Button
            size="small"
            backgroundColor="orange"
            icon={true}
            onClick={mbtiTestClick}
          >
            댕bti 검사하고 여행지 추천받으러 가기
          </Button>
        </div>
      </div>

      <div className={styles.frames}>
        <div className={styles.frame}>
          <Image
            src="/images/frame1.png"
            alt="프레임1"
            width={70}
            height={210}
            style={{ marginRight: '10px' }}
          />
          <Image
            src="/images/frame2.png"
            alt="프레임2"
            width={70}
            height={210}
            style={{ marginRight: '10px' }}
          />
          <Image
            src="/images/frame3.png"
            alt="프레임3"
            width={70}
            height={210}
          />
        </div>

        <div className={styles.title}>여행가서도 귀여운 우리 강쥐</div>
        <div className={styles.title}>인생 네컷 만들러 가기</div>

        <div className={styles.mbtiBtn}>
          <Button
            size="small"
            backgroundColor="orange"
            icon={true}
            onClick={makePhotoClick}
          >
            댕댕네컷 만들러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
