import type { SetStateAction } from 'react';
import React from 'react';

import { CheckedStarIcon, UncheckedStarIcon } from '@/public/icons';

import styles from './index.module.scss';

type ReviewScoreProps = {
  score: number;
  setScore: React.Dispatch<SetStateAction<number>>;
};

const ReviewScore = ({ score, setScore }: ReviewScoreProps) => {
  const handlePotatoClick = (grade: number) => {
    setScore(grade);
  };

  return (
    <div className={styles.scoreContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          onClick={() => handlePotatoClick(index)}
          className={styles.score}
        >
          {index <= score ? (
            <CheckedStarIcon width={50} height={50} />
          ) : (
            <UncheckedStarIcon width={50} height={50} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewScore;
