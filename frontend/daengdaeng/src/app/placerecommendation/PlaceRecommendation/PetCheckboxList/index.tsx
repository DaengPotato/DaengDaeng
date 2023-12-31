import React from 'react';


import styles from './index.module.scss';
import PetCheckbox from '../PetCheckbox';

import type { PetSimple } from '@/src/types/pet';

type PetCheckboxListProps = {
  pets: PetSimple[];
  checkedPets: number[];
  setCheckedPets: React.Dispatch<React.SetStateAction<number[]>>;
};

const PetCheckboxList = ({
  pets,
  checkedPets,
  setCheckedPets,
}: PetCheckboxListProps) => {
  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedPets((prev) => [...prev, id]);
    } else {
      setCheckedPets((prev) => prev.filter((petId) => petId !== id));
    }
  };

  return (
    <div className={styles.PetCheckboxList}>
      {pets.map((pet) => (
        <PetCheckbox
          key={pet.petId}
          pet={pet}
          checked={checkedPets.includes(pet.petId)}
          onChange={(isChecked: boolean) =>
            handleCheckboxChange(pet.petId, isChecked)
          }
        />
      ))}
    </div>
  );
};

export default PetCheckboxList;
