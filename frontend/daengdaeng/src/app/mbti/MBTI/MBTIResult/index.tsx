import React from 'react';

import Image from 'next/image';

import type { PetDetail } from '@/src/types/pet';

type MBTIResultProps = {
  pet: PetDetail;
  selectedTypes: string[];
  totalCount: number;
};

const mbtiTypes = [
  ['E', 'I'],
  ['S', 'N'],
  ['O', 'H'],
  ['W', 'D'],
];

const MBTIResult = ({ pet, selectedTypes, totalCount }: MBTIResultProps) => {
  const typeCounts = selectedTypes.reduce(
    (counts: { [key: string]: number }, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    },
    {},
  );

  const mbtiRatio: { [key: string]: number } = {
    E: (typeCounts['E'] / (totalCount / 4)) * 100,
    S: (typeCounts['S'] / (totalCount / 4)) * 100,
    O: (typeCounts['O'] / (totalCount / 4)) * 100,
    W: (typeCounts['W'] / (totalCount / 4)) * 100,
  };

  const mbti = mbtiTypes.reduce((acc: string[], types: string[]) => {
    if (mbtiRatio[types[0]] > 50) acc.push(types[0]);
    else acc.push(types[1]);
    return acc;
  }, []);

  return (
    <div>
      <div>{mbti.join('')}</div>
      <div>
        <Image src={pet.image} width={100} height={100} alt="pet Image" />
      </div>
      <div>
        {
          // TODO: 결과 비율 보여주기
        }
      </div>
    </div>
  );
};

export default MBTIResult;
