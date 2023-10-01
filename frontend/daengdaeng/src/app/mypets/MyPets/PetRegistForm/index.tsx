'use client';

import React, { useRef, useState } from 'react';

import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import ko from 'date-fns/locale/ko';
import Image from 'next/image';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import styles from './index.module.scss';

import type { PetDetail } from '@/src/types/pet';
import type { FieldValues } from 'react-hook-form';

import { NextArrowIcon, PawIcon, PrevArrowIcon } from '@/public/icons';
import Button from '@/src/components/common/Button';
import ErrorMessage from '@/src/components/ErrorMessage';
import { YEARS } from '@/src/constants/calendar';
import { getUser } from '@/src/hooks/useLocalStorage';
import { gray, primaryOrange } from '@/src/styles/colors';
import { validatePetName } from '@/src/utils/validate';

import 'react-datepicker/dist/react-datepicker.css';

type PetRegistFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const createPet = async (token: string, pet: PetDetail) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pet),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
  } catch (err) {
    console.error(err);
  }
};

const PetRegistForm = ({ setIsOpen }: PetRegistFormProps) => {
  const [petImage, setPetImage] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('');

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  registerLocale('ko', ko);

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
    setPetImage(null);
    if (petImageInput.current) {
      petImageInput.current.value = '';
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleRegist = async (data: FieldValues) => {
    // TODO: 강아지 등록 api

    const year = data.birth.getFullYear(); // 연도 가져오기
    const month = String(data.birth.getMonth() + 1).padStart(2, '0'); // 월 가져오기 (0부터 시작하므로 +1 필요), 2자리로 포맷
    const day = String(data.birth.getDate()).padStart(2, '0'); // 일 가져오기, 2자리로 포맷

    const formattedDate = `${year}-${month}-${day}`;

    const pet: PetDetail = {
      name: data.name,
      birth: formattedDate,
      gender: data.gender === '1' ? true : false,
      weight: data.weight,
    };

    if (petImage) {
      pet.image = petImage;
    }

    if (typeof window !== 'undefined') {
      const token = getUser() as string;
      await createPet(token, pet);
    }
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
            {petImage ? (
              <Image src={petImage} width={100} height={100} alt="pet Image" />
            ) : (
              <PawIcon width={100} height={100} fill={gray} />
            )}
          </div>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/webp"
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
          <div className={styles.formLabel}>이름</div>
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
          <div className={styles.formLabel}>성별</div>
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
        <div className={styles.formItemDate}>
          <div className={styles.formLabel}>생일</div>
          <Controller
            name="birth"
            control={control}
            rules={{ required: '생일을 선택해주세요.' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                className={styles.datepicker}
                calendarClassName={styles.datepickerCalendar}
                dateFormat="yyyy년 MM월 dd일"
                dateFormatCalendar="yyyy년 MM월"
                locale="ko"
                shouldCloseOnSelect={false}
                maxDate={new Date()}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                renderCustomHeader={({
                  date,
                  changeYear,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className={styles.customHeaderContainer}>
                    <div>
                      <button
                        type="button"
                        className={styles.monthBtn}
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        <PrevArrowIcon width={20} height={20} />
                      </button>
                    </div>
                    <div className={styles.currentYearMonth}>
                      <select
                        value={getYear(date)}
                        className={styles.yearSelect}
                        onChange={({ target: { value } }) => changeYear(+value)}
                      >
                        {YEARS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className={styles.currentMonth}>
                        {getMonth(date) + 1}월
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className={styles.monthBtn}
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <NextArrowIcon width={20} height={20} />
                      </button>
                    </div>
                  </div>
                )}
              />
            )}
          />
          {errors?.birth && (
            <ErrorMessage>{errors?.birth?.message}</ErrorMessage>
          )}
        </div>
        <div className={styles.formItem}>
          <div className={styles.formLabel}>몸무게</div>
          <div>
            <input
              type="number"
              className={styles.weight}
              {...register('weight', {
                required: '몸무게를 입력해주세요.',
              })}
            />
            <span>kg</span>
          </div>
          {errors?.weight && (
            <ErrorMessage>{errors?.weight?.message}</ErrorMessage>
          )}
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
