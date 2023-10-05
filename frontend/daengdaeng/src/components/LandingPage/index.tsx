'use client';

import React, { useEffect, useRef } from 'react';

import { throttle } from 'lodash';

import styles from './index.module.scss';

import Page1 from '@/src/components/LandingPage/Page1';
import Page2 from '@/src/components/LandingPage/Page2';

const DIVIDER_HEIGHT = 5;

const LandingPage = () => {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheelHandler = throttle((e: any) => {
      // throttle 함수로 감싸기
      e.preventDefault();
      if (!outerRef.current) return;
      const { deltaY } = e;
      const { scrollTop } = outerRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    }, 1000); // 1초에 한 번만 호출

    const outerRefCurrent = outerRef.current;
    if (outerRefCurrent) {
      outerRefCurrent.addEventListener('wheel', wheelHandler);
      return () => {
        outerRefCurrent.removeEventListener('wheel', wheelHandler);
      };
    }
  }, []);

  return (
    <div ref={outerRef} className={styles.LandingPage}>
      <div className={`${styles.bg} ${styles.section}`}>
        <Page1 />
      </div>
      <div className="divider"></div>
      <div className={`${styles.bg} ${styles.section}`}>
        <Page2 />
      </div>
    </div>
  );
};

export default LandingPage;
