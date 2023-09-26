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
  const [finish, setFinish] = useState<boolean>(false);

  return (
    <>
      {finish ? (
        <MBTIResult
          pet={pet}
          selectedTypes={selectedTypes}
          totalCount={questions.length}
        />
      ) : (
        <div>
          {questions.map((question) => (
            <Question
              key={question.questionId}
              question={question}
              setSelectedTypes={setSelectedTypes}
              setFinish={setFinish}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MBTITest;
