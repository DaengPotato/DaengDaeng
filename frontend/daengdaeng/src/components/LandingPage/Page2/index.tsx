'use client';
import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

const Page2 = () => {
  return (
    <div className={styles.HomePage}>
      <div className={styles.titleBox}>
        <div className={styles.title}>귀여운 우리 강아지</div>
        <div className={styles.title}>댕댕네컷 만들고 자랑하자!</div>
      </div>
      <div className={styles.content}>
        <Image
          className={styles.heart}
          src="/images/heart.png"
          alt="찜"
          width={120}
          height={120}
        />
        <div className={styles.frames}>
          <Image
            className={styles.frame}
            src="/images/frame1.png"
            alt="인생네컷1"
            width={80}
            height={240}
          />
          <Image
            className={styles.frame}
            src="/images/frame2.png"
            alt="인생네컷2"
            width={80}
            height={240}
          />
          <Image
            className={styles.frame}
            src="/images/frame3.png"
            alt="인생네컷3"
            width={80}
            height={240}
          />
        </div>
      </div>
    </div>
  );
};

export default Page2;
