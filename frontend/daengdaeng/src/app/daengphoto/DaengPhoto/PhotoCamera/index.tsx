import React from 'react';

import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { CameraIcon } from '@/public/icons';
import { white } from '@/src/styles/colors';

const PhotoCamera = () => {
  const router = useRouter();

  const handleClickupload = () => {
    router.push('/photoupload');
  };

  return (
    <div className={styles.cameraButton} onClick={handleClickupload}>
      <CameraIcon width={30} height={30} fill={white} />
    </div>
  );
};

export default PhotoCamera;
