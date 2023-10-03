import { useEffect, useState } from 'react';

import styles from './index.module.scss';
import PhotoCamera from './PhotoCamera';

import type { ImageType } from '@/src/types/image';

import { LeftIcon } from '@/public/icons';
import { RightIcon } from '@/public/icons';
import { primaryOrange } from '@/src/styles/colors';

// 이미지 불러오기 함수
const fetchImages = async (cursor: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/photo?cursor=${cursor}`,
    {
      method: 'GET',
    },
  );
  if (!response.ok) {
    throw new Error('이미지 조회 실패');
  }
  const data = JSON.parse(await response.text());
  console.log(data.photoList);
  return data;
};
// 댕포토 페이지 메인
const DaengPhoto = () => {
  const [photoList, setPhotoList] = useState<ImageType[]>([]);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(1);
  const [toggleIndex, setToggleIndex] = useState(-1);

  // 최초 로딩시 불러오기
  useEffect(() => {
    (async () => {
      const photoListdata = await fetchImages(cursor);
      setPhotoList(photoListdata.photoList);
      setNextCursor(photoListdata.nextCursor);
    })();
  }, [cursor]);

  // 왼쪽 커서 함수
  const handleLeftCursor = () => {
    if (cursor == 0) {
      return;
    }
    setCursor(cursor - 1);
  };
  // 오른쪽 커서 함스
  const handleRightCursor = () => {
    if (nextCursor == -1) {
      return;
    }
    setCursor(cursor + 1);
  };

  // 이미지 클릭 시
  const clickPhoto = (i: number) => {
    if (toggleIndex == i) {
      setToggleIndex(-1);
      return;
    }
    setToggleIndex(i);
  };

  return (
    <div>
      <div>{<PhotoCamera />}</div>
      <div className={styles.container}>
        {/* 이미지 */}
        <div className={styles.photoList}>
          {photoList.map((photo, index) => (
            <div
              onClick={() => clickPhoto(index)}
              key={index}
              className={`${styles.photo} ${
                toggleIndex == index ? styles.photoBlur : ''
              }`}
            >
              {toggleIndex == index && (
                <div className={styles.photoPlace}>{photo.place}</div>
              )}
            </div>
          ))}
        </div>
        {/* 버튼 */}
        <div className={styles.pagebutton}>
          <div className={styles.btnContainer}>
            <button className={styles.leftbutton} onClick={handleLeftCursor}>
              <LeftIcon width={50} height={50} fill={primaryOrange} />
            </button>
            <button className={styles.rightbutton} onClick={handleRightCursor}>
              <RightIcon width={50} height={50} fill={primaryOrange} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DaengPhoto;
