import React, { useState } from 'react';

import styles from './index.module.scss';

import type { mbtiQuestion } from '@/src/types/mbti';

type QuestionProps = {
  question: mbtiQuestion;
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Question = ({
  question,
  setSelectedTypes,
  setQuestionIndex,
}: QuestionProps) => {
  const [answerIndex, setAnswerIndex] = useState<number>(0);

  const handleSelectAnswer = (id: number, type: string) => {
    setAnswerIndex(id);
    setTimeout(() => {
      setQuestionIndex((prev) => prev + 1);
    }, 300);
    setSelectedTypes((prev) => [...prev, type]);
  };

  return (
    <div className={styles.Question}>
      <div className={styles.questionTitle}>{question.question}</div>
      <div className={styles.answer}>
        <div
          onClick={() => handleSelectAnswer(1, question.type.typeA)}
          className={`${styles.answerItem} ${
            answerIndex === 1 ? `${styles.selected}` : ''
          }`}
        >
          {question.answerA}
        </div>
        <div
          onClick={() => handleSelectAnswer(2, question.type.typeB)}
          className={`${styles.answerItem} ${
            answerIndex === 2 ? `${styles.selected}` : ''
          }`}
        >
          {question.answerB}
        </div>
      </div>
    </div>
  );
};

export default Question;
