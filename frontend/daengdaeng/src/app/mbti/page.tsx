import React from 'react';

import MBTITest from './MBTI';

import type { mbtiQuestion } from '@/src/types/mbti';

const MBTITestPage = () => {
  // TODO: mbti 질문 리스트 fetch

  return <MBTITest questions={questions} />;
};

export default MBTITestPage;

// dummy data
const questions: mbtiQuestion[] = [
  {
    questionId: 1,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'W',
      typeB: 'D',
    },
  },
  {
    questionId: 2,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'W',
      typeB: 'D',
    },
  },
  {
    questionId: 3,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'W',
      typeB: 'D',
    },
  },
  {
    questionId: 4,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'O',
      typeB: 'H',
    },
  },
  {
    questionId: 5,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'O',
      typeB: 'H',
    },
  },
  {
    questionId: 6,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'O',
      typeB: 'H',
    },
  },
  {
    questionId: 7,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'S',
      typeB: 'N',
    },
  },
  {
    questionId: 8,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'S',
      typeB: 'N',
    },
  },
  {
    questionId: 9,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'S',
      typeB: 'N',
    },
  },
  {
    questionId: 10,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'E',
      typeB: 'I',
    },
  },
  {
    questionId: 11,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'E',
      typeB: 'I',
    },
  },
  {
    questionId: 12,
    question: '목욕을 하자고 할 때',
    answerA: '나는 물 싫어.. 무서워(크으응)',
    answerB: '물 좋아!!! 아싸',
    type: {
      typeA: 'E',
      typeB: 'I',
    },
  },
];
