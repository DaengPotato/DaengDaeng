import React, { useState } from 'react';

import type { mbtiQuestion } from '@/src/types/mbti';

type QuestionProps = {
  question: mbtiQuestion;
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
};

const Question = ({ question, setSelectedTypes, setFinish }: QuestionProps) => {
  const [index, setIndex] = useState<number>(0);

  const handleSelectAnswer = (type: string) => {
    if (index === 10) {
      setFinish(true);
      return;
    }
    setIndex((prev) => prev + 1);
    setSelectedTypes((prev) => [...prev, type]);
  };

  return (
    <div>
      <div>{question.question}</div>
      <div>
        <div onClick={() => handleSelectAnswer(question.type.typeA)}>
          {question.answerA}
        </div>
        <div onClick={() => handleSelectAnswer(question.type.typeB)}>
          {question.answerB}
        </div>
      </div>
    </div>
  );
};

export default Question;
