import React from 'react';

import styles from './index.module.scss';

import { CameraIcon } from '@/public/icons';
import { white } from '@/src/styles/colors';

type CameraButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PhotoCamera = ({ onClick }: CameraButtonProps) => {
  return (
    <button className={styles.cameraButton} onClick={onClick}>
      <CameraIcon width={30} height={30} fill={white} />
    </button>
  );
};

export default PhotoCamera;
