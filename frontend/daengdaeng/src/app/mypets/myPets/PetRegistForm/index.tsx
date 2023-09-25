'use client';

import React, { useState, useRef } from 'react';

import { useForm } from 'react-hook-form';

import BlankProfileImg from '@/public/images/blank-profile.webp';
import Image, { StaticImageData } from 'next/image';

import styles from './index.module.scss';

const PetRegistForm = () => {
  const [petImage, setPetImage] = useState<string | StaticImageData>(
    BlankProfileImg,
  );

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

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur' });

  return (
    <form>
      <div>강아지 등록하기</div>
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
          <button type="button" onClick={handleRemoveImage}>
            이미지 삭제
          </button>
        </div>
      </div>
      <div>
        <div>이름</div>
        <input type="text" placeholder="이름" />
      </div>
      <div>
        <div>성별</div>
        <fieldset>
          <label>
            <input type="radio" name="gender" value="female" />
            <span>여자</span>
          </label>
          <label>
            <input type="radio" name="gender" value="male" />
            <span>남자</span>
          </label>
        </fieldset>
      </div>
      <div>
        <div>날짜</div>
        <input type="text" placeholder="날짜" />
      </div>
      <div>
        <input type="text" placeholder="이름" />
      </div>
    </form>
  );
};

export default PetRegistForm;
