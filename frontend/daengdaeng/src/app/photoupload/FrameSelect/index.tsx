'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/src/components/common/Button';

import FrameCarousel from './FrameCarousel';
import styles from './index.module.scss';

type FrameSelectProps = {
  setFrameUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsSelected: React.Dispatch<React.SetStateAction<Boolean>>;
};
0;

const FrameSelect = ({ setFrameUrl, setIsSelected }: FrameSelectProps) => {
  const router = useRouter();

  // 취소 버튼 클릭 시 라우팅
  const handleCancelClick = () => {
    router.push('/daengphoto');
  };

  // 완료 버튼 클릭 시 프레임url 설정
  const handleFinishClick = () => {
    setIsSelected(true);
  };

  return (
    <div className={styles.SelectContainer}>
      <div className={styles.FrameCarouselContainer}>
        <FrameCarousel
          options={{ dragFree: true, containScroll: 'trimSnaps' }}
          setFrameUrl={setFrameUrl}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          type="button"
          size="small"
          backgroundColor="gray"
          onClick={handleCancelClick}
          icon={false}
        >
          취소
        </Button>
        <Button
          size="small"
          backgroundColor="orange"
          onClick={handleFinishClick}
          icon={false}
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default FrameSelect;
