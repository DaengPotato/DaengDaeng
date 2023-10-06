import React, { useEffect, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './index.module.scss';
import FrameCard from '../FrameCard';

import type { Frame } from '@/src/types/frame';
import type { EmblaOptionsType } from 'embla-carousel-react';

type FrameCarouselProps = {
  options?: EmblaOptionsType;
  setFrameUrl: React.Dispatch<React.SetStateAction<string>>;
};

const FrameCarousel = ({
  // frames,
  options,
  setFrameUrl,
}: FrameCarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [emblaRef, _] = useEmblaCarousel(options);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // 이미지 불러오기 함수
  // const getFrames = async () => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/photo/frame`,
  //   {
  //     method: 'GET',
  //   },
  // );
  // if (!response.ok) {
  //   throw new Error('프레임 조회 실패');
  // }
  // const data = JSON.parse(await response.text());
  // return data;
  // };

  // 최초 로딩시 불러오기
  useEffect(() => {
    (async () => {
      // const FrameListdata = await getFrames();
      const FrameListData: Frame[] = [
        { frameName: 'frame01', frameUrl: '/images/daengFrame01empty.png' },
        { frameName: 'frame02', frameUrl: '/images/daengFrame02empty.png' },
        { frameName: 'frame03', frameUrl: '/images/daengFrame03empty.png' },
      ];
      setFrames(FrameListData);
    })();
  }, []);

  return (
    <div className={styles.Carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {frames.map((item: Frame, index: number) => (
            <div className={styles.slide} key={item.frameName}>
              <FrameCard
                index={index}
                frameInfo={item}
                setFrameUrl={setFrameUrl}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameCarousel;
