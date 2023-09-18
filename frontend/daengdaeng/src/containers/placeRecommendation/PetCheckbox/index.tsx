import React from 'react';

import styles from './index.module.scss';

import { PawIcon } from '@/public/icons';

import { PetSimple } from '@/src/types/pet';

import { white } from '@/src/styles/colors';

type PetCheckboxProps = {
  pet: PetSimple;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
};

const PetCheckbox = ({ pet, checked, onChange }: PetCheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <>
      <input
        type="checkbox"
        id={`pet${pet.petId}`}
        className={styles.checkboxInput}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`pet${pet.petId}`} className={styles.checkbox}>
        <span className={styles.checkboxText}>{pet.name}</span>
        <span className={styles.checkboxIcon}></span>
        <PawIcon fill={white} width={'1.8rem'} height={'1.8rem'} />
      </label>
    </>
  );
};

export default PetCheckbox;
