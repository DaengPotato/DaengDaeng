import React from 'react';

import styles from './index.module.scss';

import type { KeywordReview } from '@/src/types/place';

type KeywordCheckboxProps = {
  keyword: KeywordReview;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
};

const KeywordCheckbox = ({
  keyword,
  checked,
  onChange,
}: KeywordCheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <>
      <input
        type="checkbox"
        id={`keyword${keyword.keywordId}`}
        className={styles.checkboxInput}
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={`keyword${keyword.keywordId}`}
        className={styles.checkbox}
      >
        <span className={styles.checkboxText}>{keyword.keyword}</span>
        <span className={styles.checkboxIcon}></span>
      </label>
    </>
  );
};

export default KeywordCheckbox;
