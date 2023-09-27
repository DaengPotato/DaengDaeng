import React, { useState } from 'react';

import MBTIResult from '../MBTIResult/index';
import Question from '../Question';

import type { mbtiQuestion } from '@/src/types/mbti';
import type { PetDetail } from '@/src/types/pet';

type MBTITestProps = {
  pet: PetDetail;
  questions: mbtiQuestion[];
};

const MBTITest = ({ pet, questions }: MBTITestProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  return (
    <>
      {questionIndex > 11 ? (
        <MBTIResult
          pet={pet}
          selectedTypes={selectedTypes}
        />
      ) : (
        <div>
          <Question
            key={questions[questionIndex].questionId}
            question={questions[questionIndex]}
            setSelectedTypes={setSelectedTypes}
            setQuestionIndex={setQuestionIndex}
          />
        </div>
      )}
    </>
  );
};

export default MBTITest;
