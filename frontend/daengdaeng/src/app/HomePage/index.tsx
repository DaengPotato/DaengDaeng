'use client';
import React from 'react';

import Page1 from '@/src/app/HomePage/Page1';
import Page2 from '@/src/app/HomePage/Page2';

import styles from './index.module.scss';

const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <div>
        <Page1 />
      </div>
      <div>
        <Page2 />
      </div>
    </div>
  );
};

export default HomePage;
