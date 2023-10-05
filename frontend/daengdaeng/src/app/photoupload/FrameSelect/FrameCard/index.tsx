import React from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

import type { Frame } from '@/src/types/frame';

type FrameCardProps = {
  index: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  frameInfo: Frame;
  setFrameUrl: React.Dispatch<React.SetStateAction<string>>;
};

const FrameCard = ({
  index,
  selectedIndex,
  setSelectedIndex,
  frameInfo,
  setFrameUrl,
}: FrameCardProps) => {
  const handleOnclick = () => {
    setFrameUrl(frameInfo.frameUrl);
    setSelectedIndex(index);
  };
  return (
    <div onClick={handleOnclick} className={styles.CardContainer}>
      <Image
        src={frameInfo.frameUrl}
        alt={frameInfo.frameName}
        width={150}
        height={400}
        // onClick={handleOnclick}
        className={`${styles.Image} 
        ${selectedIndex === index ? styles.SelectImage : undefined}`}
      />
      <input
        type="radio"
        checked={selectedIndex === index ? true : false}
        className={styles.RadioButton}
      />
    </div>
  );
};

export default FrameCard;
