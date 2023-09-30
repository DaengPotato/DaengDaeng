// import Image from 'next/image';

import LikeButton from '@/src/components/LikeButton';

import styles from './index.module.scss';

import type { Place } from '@/src/types/place';

type PlaceInfoProps = {
  place: Place;
};

const PlaceInfo = ({ place }: PlaceInfoProps) => {
  const handleLikeClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    console.log('조아요');
  };

  return (
    <div className={styles.placeContainer}>
      <div>
        {/* <Image src={place.placeImage} alt="place image" width={120} height={120} /> */}
      </div>
      <div>
        <div className={styles.title}>{place.title}</div>
        <div className={styles.address}>{place.jibunAddress}</div>
        <div>
          <div className={styles.likeBtn}>
            <LikeButton isLiked={place.isHeart} onClick={handleLikeClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfo;
