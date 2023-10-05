'use client';
import React from 'react';

import Page1 from '@/src/app/HomePage/Page1';
import Page2 from '@/src/app/HomePage/Page2';

import styles from './index.module.scss';

const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <Page1 />
      <Page2 />
    </div>
  );
};

export default HomePage;
