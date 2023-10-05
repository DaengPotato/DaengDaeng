'use client';
import { useState } from 'react';

import FrameSelect from './FrameSelect';
import styles from './index.module.scss';
import PhotoUpload from './PhotoUpload';

const PhotoUploadPage = () => {
  const [frameUrl, setFrameUrl] = useState<string>('');
  const [isSelected, setIsSelected] = useState<Boolean>(false);
  return (
    <div className={styles.PageContainer}>
      {isSelected ? (
        <PhotoUpload frameUrl={frameUrl} />
      ) : (
        <FrameSelect setFrameUrl={setFrameUrl} setIsSelected={setIsSelected} />
      )}
    </div>
  );
};

export default PhotoUploadPage;
