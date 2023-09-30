import styles from './index.module.scss';

import { LeftIcon } from '@/public/icons';
import { RightIcon } from '@/public/icons';
import { primaryOrange } from '@/src/styles/colors';

const PhotoPage = async () => {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.leftbutton}>
        <LeftIcon width={50} height={50} fill={primaryOrange} />
      </button>
      <button className={styles.rightbutton}>
        <RightIcon width={50} height={50} fill={primaryOrange} />
      </button>
    </div>
  );
};
export default PhotoPage;
