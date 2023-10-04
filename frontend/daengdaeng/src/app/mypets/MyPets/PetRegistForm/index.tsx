'use client';

import React, { useEffect, useRef, useState } from 'react';

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
import { createPet, deletePet, updatePet } from '@/src/apis/api/pet';
import Button from '@/src/components/common/Button';
import ErrorMessage from '@/src/components/ErrorMessage';
import { YEARS } from '@/src/constants/calendar';
import { gray, primaryOrange } from '@/src/styles/colors';
import { clacAge } from '@/src/utils/date';
import { validatePetName } from '@/src/utils/validate';

import 'react-datepicker/dist/react-datepicker.css';

type PetRegistFormProps = {
  closeForm: () => void;
  mutate: any;
  editingPet?: PetDetail;
};

type petReqType = {
  name: string;
  birth: string;
  gender: boolean;
  weight: number;
  image?: File;
};

const PetRegistForm = ({
  closeForm,
  mutate,
  editingPet,
}: PetRegistFormProps) => {
  const [petImage, setPetImage] = useState<File | undefined>(undefined);
  const [currentPetImage, setCurrentPetImage] = useState<string | undefined>(
    editingPet ? editingPet.image : undefined,
  );
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [noBirthData, setNoBirthData] = useState<boolean>(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (editingPet) {
      setValue('name', editingPet.name);
      setValue('gender', editingPet.gender);
    }
  }, [setValue, editingPet]);

  registerLocale('ko', ko);

  // eslint-disable-next-line no-null/no-null
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

    setPetImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setCurrentPetImage(e.target.result);
      }
    };
  };

  const handleRemoveImage = () => {
    setPetImage(undefined);
    setCurrentPetImage(undefined);
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
    let birth: string = '';
    if (data.birth) {
      const year = data.birth.getFullYear(); // 연도 가져오기
      const month = String(data.birth.getMonth() + 1).padStart(2, '0'); // 월 가져오기 (0부터 시작하므로 +1 필요), 2자리로 포맷
      const day = String(data.birth.getDate()).padStart(2, '0'); // 일 가져오기, 2자리로 포맷
      birth = `${year}-${month}-${day}`;
    } else {
      const today = new Date();
      const fewYearsAgo = new Date(today);
      fewYearsAgo.setFullYear(today.getFullYear() - data.age);
      birth = `${fewYearsAgo.getFullYear()}-${String(
        fewYearsAgo.getMonth() + 1,
      ).padStart(2, '0')}-${String(fewYearsAgo.getDate()).padStart(2, '0')}`;
    }

    const pet: petReqType = {
      name: data.name,
      birth: birth,
      gender: data.gender === '1' ? true : false,
      weight: data.weight,
    };

    console.log(pet);

    const formData = new FormData();

    if (petImage) {
      // 이미지 파일을 formData에 추가
      formData.append('image', petImage);
    }

    // PetRequest 객체를 JSON 문자열로 변환하여 formData에 추가
    formData.append(
      'petRequest',
      new Blob([JSON.stringify(pet)], {
        type: 'application/json',
      }),
    );

    if (typeof window !== 'undefined') {
      let res;
      if (editingPet) {
        res = await updatePet(formData, editingPet.petId);
      } else {
        res = await createPet(formData);
      }
      if (res.ok) {
        await mutate();
        closeForm();
      }
    }
  };

  const handleCancel = () => {
    closeForm();
  };

  const handleSelectGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.value);
  };

  const handleNoBirthData = () => {
    setNoBirthData((prev) => !prev);
  };

  const handleDeletePet = async () => {
    if (!editingPet) return;
    if (!window.confirm(`'${editingPet.name}'의 정보를 삭제할까요?`)) return;
    const res = await deletePet(editingPet.petId);
    if (res.ok) {
      await mutate();
      closeForm();
    }
  };

  return (
    <div className={styles.PetRegistForm}>
      <form className={styles.registForm}>
        <div className={styles.title}>반려견 정보를 입력해주세요!</div>
        <div className={styles.petImageUpload}>
          <div onClick={handlePetImageClick} className={styles.petImage}>
            {currentPetImage ? (
              <Image
                src={currentPetImage}
                width={100}
                height={100}
                alt="pet Image"
              />
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
              value: editingPet ? editingPet.name : '',
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
          {noBirthData ? (
            <div className={styles.formLabel}>나이</div>
          ) : (
            <div className={styles.formLabel}>생일</div>
          )}
          {!noBirthData ? (
            <Controller
              name="birth"
              control={control}
              rules={{
                required: noBirthData ? false : '생일을 선택해주세요.',
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  className={styles.datepicker}
                  calendarClassName={styles.datepickerCalendar}
                  dateFormat="yyyy년 MM월 dd일"
                  dateFormatCalendar="yyyy년 MM월"
                  locale="ko"
                  shouldCloseOnSelect
                  maxDate={new Date()}
                  selected={
                    !field.value && editingPet
                      ? new Date(editingPet.birth)
                      : field.value
                  }
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
                          onChange={({ target: { value } }) =>
                            changeYear(+value)
                          }
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
          ) : (
            <div>
              <input
                type="number"
                className={styles.weight}
                {...register('age', {
                  value: editingPet ? clacAge(editingPet.birth) : undefined,
                  required: noBirthData ? '나이를 입력해주세요.' : false,
                })}
              />
              <span>살</span>
            </div>
          )}
          <input
            type="checkbox"
            id="noBirthData"
            className={styles.noBirthDataCheckbox}
            checked={noBirthData}
          />
          <div className={styles.noBirthDataLabel} onClick={handleNoBirthData}>
            <label
              htmlFor="noBirthData"
              className={`${styles.noBirthData} ${
                noBirthData ? `${styles.checked}` : ''
              }`}
            ></label>
            <div className={styles.label}>생일을 몰라요</div>
          </div>
          {!noBirthData && errors?.birth && (
            <ErrorMessage>{errors?.birth?.message}</ErrorMessage>
          )}
          {noBirthData && errors?.age && (
            <ErrorMessage>{errors?.age?.message}</ErrorMessage>
          )}
        </div>
        <div className={styles.formItem}>
          <div className={styles.formLabel}>몸무게</div>
          <div>
            <input
              type="number"
              className={styles.weight}
              {...register('weight', {
                value: editingPet ? editingPet.weight : undefined,
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
      {editingPet && (
        <div className={styles.deletePet}>
          <button onClick={handleDeletePet}>반려견 정보 삭제하기</button>
        </div>
      )}
    </div>
  );
};

export default PetRegistForm;
