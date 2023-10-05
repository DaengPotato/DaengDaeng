import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

const Page1 = () => {
  return (
    <div className={styles.HomePage}>
      <div className={styles.titleBox}>
        <div className={styles.title}>댕BTI 검사하고</div>
        <div className={styles.title}>반려견 맞춤 여행지 추천 받자!</div>
      </div>
      <div className={styles.petsImage}>
        <Image
          className={styles.balloons}
          src="/images/balloons.png"
          alt="발바닥 풍선 세개"
          width={500}
          height={300}
        />
        <Image
          className={styles.threePets}
          src="/images/three_pets.png"
          alt="강아지 세마리"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default Page1;
