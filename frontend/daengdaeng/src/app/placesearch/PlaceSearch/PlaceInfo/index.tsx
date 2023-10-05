import { useState } from 'react';

import Image from 'next/image';

import LikeButton from '@/src/components/LikeButton';

import styles from './index.module.scss';

import type { Place } from '@/src/types/place';

type PlaceInfoProps = {
  place: Place;
};

const PlaceInfo = ({ place }: PlaceInfoProps) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const handleLikeClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.placeContainer}>
      <div className={styles.likeBtn}>
        <LikeButton isLiked={place.isHeart} onClick={handleLikeClick} />
      </div>
      <div className={styles.imgContainer}>
        {!imgError &&
        place.placeImage &&
        typeof place.placeImage === 'string' ? (
          <Image
            src={place.placeImage}
            alt="place image"
            width={120}
            height={120}
            onError={() => setImgError(true)}
          />
        ) : (
          <>기본 이미지</>
        )}
      </div>
      <div className={styles.placeInfo}>
        <div className={styles.title}>{place.title}</div>
        <div className={styles.address}>{place.jibunAddress}</div>
      </div>
    </div>
  );
};

export default PlaceInfo;
