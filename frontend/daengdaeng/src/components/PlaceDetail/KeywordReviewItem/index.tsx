import React from 'react';

import styles from './index.module.scss';

import type { KeywordReview } from '@/src/types/place';

type KeywordReviewItemProps = {
  keyword: KeywordReview;
  viewCount?: boolean;
};

const KeywordReviewItem = ({ keyword, viewCount }: KeywordReviewItemProps) => {
  return (
    <div className={styles.KeywordReviewItem}>
      <div className={styles.keywordContent}>{keyword.keyword}</div>
      {viewCount && (
        <div className={styles.keywordCount}>{keyword.keywordCnt}</div>
      )}
    </div>
  );
};

export default KeywordReviewItem;
