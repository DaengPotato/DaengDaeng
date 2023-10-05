import React from 'react';

import styles from './index.module.scss';
import KeywordCheckbox from '../KeywordCheckbox';

import type { KeywordReview } from '@/src/types/place';

type KeywordCheckboxListProps = {
  keywords: KeywordReview[];
  checkedKeywords: number[];
  setCheckedKeywords: React.Dispatch<React.SetStateAction<number[]>>;
};

const KeywordCheckboxList = ({
  keywords,
  checkedKeywords,
  setCheckedKeywords,
}: KeywordCheckboxListProps) => {
  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedKeywords((prev) => [...prev, id]);
    } else {
      setCheckedKeywords((prev) =>
        prev.filter((keywordId) => keywordId !== id),
      );
    }
  };

  return (
    <div
      className={`${styles.KeywordCheckboxList} ${styles.keywordReviewContainer}`}
    >
      {keywords.map((keyword) => (
        <KeywordCheckbox
          key={keyword.keywordId}
          keyword={keyword}
          checked={checkedKeywords.includes(keyword.keywordId)}
          onChange={(isChecked: boolean) =>
            handleCheckboxChange(keyword.keywordId, isChecked)
          }
        />
      ))}
    </div>
  );
};

export default KeywordCheckboxList;
