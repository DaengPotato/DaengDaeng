'use client';
import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/src/components/common/Button';

import styles from './index.module.scss';

const HomePage = () => {
  const router = useRouter();

  function mbtiTestClick() {
    router.push('/mbti');
  }

  function makePhotoClick() {
    router.push('/daengphoto');
  }

  return (
    <div className={styles.HomePage}>
      <div className={styles.backTop}>
        <div className={styles.title}>댕biti 검사하고</div>
        <div className={styles.title}>맞춤 여행지 추천 받자</div>
        <div className={styles.petsImage}>
          <Image
            className={styles.balloons}
            src="/images/balloons.png"
            alt="발바닥 풍선 세개"
            width={500}
            height={500}
            priority={true}
          />
          <Image
            className={styles.threePets}
            src="/images/three_pets.png"
            alt="강아지 세마리"
            width={500}
            height={500}
            priority={true}
          />
        </div>
      </div>

      <div className={styles.backBottom}>
        {/* <Image
          className={styles.wave}
          src="/images/blue_back.png"
          alt="여행 이미지"
          width={200}
          height={200}
          priority={true}
        /> */}
        <div className={styles.backBottomContent}>
          <div className={styles.contentBox}>
            <div className={styles.content}>강아지와 떠나는 여행</div>
            <div className={styles.content}>
              우리 강아지는 어떤 곳을 좋아할까?
            </div>
          </div>
          <div className={styles.frames}>
            <Image
              className={styles.frame}
              src="/images/frame1.png"
              alt="프레임1"
              width={80}
              height={240}
              style={{ marginRight: '10px' }}
            />
            <Image
              className={styles.frame}
              src="/images/frame2.png"
              alt="프레임2"
              width={80}
              height={240}
              style={{ marginRight: '10px' }}
            />
            <Image
              className={styles.frame}
              src="/images/frame3.png"
              alt="프레임3"
              width={80}
              height={240}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
