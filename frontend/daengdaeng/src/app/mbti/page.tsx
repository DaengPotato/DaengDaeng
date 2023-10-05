'use client';

import React from 'react';

import MBTI from './MBTI';

import type { mbtiQuestion } from '@/src/types/mbti';
import type { PetDetail } from '@/src/types/pet';

import useFetcher from '@/src/hooks/useFetcher';

const MBTIPage = () => {
  const { data: pets, mutate: mutatePets } =
    useFetcher<PetDetail[]>(`/pet/detail`);
  const { data: questions } = useFetcher<mbtiQuestion[]>(`/mbti`);

  return <MBTI pets={pets} questions={questions} mutatePets={mutatePets} />;
};

export default MBTIPage;
