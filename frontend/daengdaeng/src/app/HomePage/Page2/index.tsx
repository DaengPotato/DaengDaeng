'use client';
import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

const Page2 = () => {
  return (
    <div className={styles.HomePage}>
      <div className={styles.backTop}>
        <div className={styles.titleBox}>
          <div className={styles.title}>여행가서도 귀여운 댕댕이</div>
          <div className={styles.title}>인생네컷 만들기</div>
        </div>
        <div>
          <Image
            className={styles.heart}
            src="/images/heart.png"
            alt="찜"
            width={200}
            height={200}
            style={{ marginRight: '10px' }}
          />
        </div>
        <div className={styles.frames}>
          <Image
            className={styles.frame}
            src="/images/frame1.png"
            alt="인생네컷1"
            width={80}
            height={240}
            style={{ marginRight: '10px' }}
          />
          <Image
            className={styles.frame}
            src="/images/frame2.png"
            alt="인생네컷2"
            width={80}
            height={240}
            style={{ marginRight: '10px' }}
          />{' '}
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
