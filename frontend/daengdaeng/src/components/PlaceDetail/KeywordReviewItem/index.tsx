import React from 'react';

import styles from './index.module.scss';

import type { KeywordReview } from '@/src/types/trip';


const KeywordReviewItem = ({ keyword }: { keyword: KeywordReview }) => {
  return (
    <div className={styles.KeywordReviewItem}>
      <div className={styles.keywordContent}>{keyword.keyword}</div>
      <div className={styles.keywordCount}>{keyword.keywordCnt}</div>
    </div>
  );
};

export default KeywordReviewItem;
