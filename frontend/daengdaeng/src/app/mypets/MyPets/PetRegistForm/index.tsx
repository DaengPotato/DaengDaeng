'use client';

import React, { useRef, useState } from 'react';

import Image from 'next/image';
import { useForm } from 'react-hook-form';

import styles from './index.module.scss';

import type { StaticImageData } from 'next/image';

import { PawIcon } from '@/public/icons';
import BlankProfileImg from '@/public/images/blank-profile.webp';
import Button from '@/src/components/common/Button';
import ErrorMessage from '@/src/components/ErrorMessage';
import { gray, primaryOrange } from '@/src/styles/colors';
import { validatePetName } from '@/src/utils/validate';

type PetRegistFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PetRegistForm = ({ setIsOpen }: PetRegistFormProps) => {
  const [petImage, setPetImage] = useState<string | StaticImageData>(
    BlankProfileImg,
  );
  const [selectedGender, setSelectedGender] = useState<string>('');

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur' });

  const petImageInput = useRef<HTMLInputElement>(null);

  const handlePetImageClick = () => {
    if (petImageInput.current) {
      petImageInput.current.click();
    }
  };

  const handleUploadImage = (e: React.ChangeEvent) => {
    const fileList = (e.target as HTMLInputElement).files as FileList;
    const file = fileList[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setPetImage(e.target.result);
      }
    };
  };

  const handleRemoveImage = () => {
    setPetImage(BlankProfileImg);
    if (petImageInput.current) {
      petImageInput.current.value = '';
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleRegist = () => {
    // TODO: 강아지 등록 api
    console.log('submitted');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSelectGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.value);
  };

  return (
    <div className={styles.PetRegistForm}>
      <form className={styles.registForm}>
        <div className={styles.title}>강아지 등록하기</div>
        <div className={styles.petImageUpload}>
          <div onClick={handlePetImageClick} className={styles.petImage}>
            <Image src={petImage} width={100} height={100} alt="pet Image" />
          </div>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={petImageInput}
            onChange={handleUploadImage}
          />
          <div>
            <button
              type="button"
              onClick={handleRemoveImage}
              className={styles.imgRemoveBtn}
            >
              이미지 삭제
            </button>
          </div>
        </div>
        <div className={styles.formItem}>
          <div>이름</div>
          <input
            type="text"
            {...register('name', {
              required: '이름을 입력해주세요.',
              maxLength: {
                value: 20,
                message: '20자 이하로 입력해주세요.',
              },
              validate: validatePetName,
            })}
            onKeyDown={handleFormKeyDown}
          />
          {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </div>
        <div className={styles.formItem}>
          <div>성별</div>
          <fieldset className={styles.genderRadioGroup}>
            <label className={styles.label}>
              <input
                className={styles.radioInput}
                type="radio"
                value="1"
                checked={selectedGender === '1'}
                {...register('gender', {
                  required: '성별을 선택해주세요.',
                })}
                onChange={handleSelectGender}
              />
              <span>
                {selectedGender === '1' ? (
                  <PawIcon fill={primaryOrange} width={30} height={30} />
                ) : (
                  <PawIcon fill={gray} width={30} height={30} />
                )}
              </span>
              <span>여자</span>
            </label>
            <label className={styles.label}>
              <input
                className={styles.radioInput}
                type="radio"
                value="0"
                checked={selectedGender === '0'}
                {...register('gender', {
                  required: '성별을 선택해주세요.',
                })}
                onChange={handleSelectGender}
              />
              <span>
                {selectedGender === '0' ? (
                  <PawIcon fill={primaryOrange} width={30} height={30} />
                ) : (
                  <PawIcon fill={gray} width={30} height={30} />
                )}
              </span>
              <span>남자</span>
            </label>
          </fieldset>
          {errors?.gender && (
            <ErrorMessage>{errors?.gender?.message}</ErrorMessage>
          )}
        </div>
        <div className={styles.formItem}>
          <div>생일</div>
          <input type="text" />
        </div>
        <div className={styles.formItem}>
          <div>몸무게</div>
          <div>
            <input type="number" className={styles.weight} />
            <span>kg</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            type="button"
            size="small"
            backgroundColor="gray"
            onClick={handleCancel}
            icon={true}
          >
            취소
          </Button>
          <Button
            size="small"
            backgroundColor="orange"
            onClick={handleSubmit(handleRegist)}
            icon={true}
          >
            등록
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PetRegistForm;
