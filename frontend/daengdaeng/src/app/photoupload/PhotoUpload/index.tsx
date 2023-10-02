/* eslint-disable no-null/no-null */
'use client';

import type { ChangeEvent, RefObject } from 'react';
import React, { useRef, useState } from 'react';

import ImageNext from 'next/image';

import Button from '@/src/components/common/Button';
import Modal from '@/src/components/common/Modal';

import styles from './index.module.scss';
import InfoRegistForm from './InfoRegistForm';
import PhotoLayer from './PhotoLayer';
import PhotoRegistForm from './PhotoRegistForm';

const PhotoUpload = () => {
  // 더미. 추수 url 받아올 것
  const frameUrl = '/images/frame3.png';
  const frameWidth = 250;
  const photoWidth = frameWidth * 0.84;
  const photoHeight = frameWidth * 0.55;

  const photoCount = 4;
  const layerArray = Array(photoCount)
    .fill(undefined)
    .map((value, index) => index);

  // 포토레이어에 할당할 ref
  const refArray: React.RefObject<HTMLCanvasElement>[] =
    Array(photoCount).fill(undefined);
  refArray[0] = useRef<HTMLCanvasElement>(null);
  refArray[1] = useRef<HTMLCanvasElement>(null);
  refArray[2] = useRef<HTMLCanvasElement>(null);
  refArray[3] = useRef<HTMLCanvasElement>(null);

  // 이미지 등록 모달 관련
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageData, setImageData] = useState<ImageData>();
  const [requestIndex, setRequestIndex] = useState<number>(-1);

  // 장소 펫 선택 모달 관련
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  // 공개여부 선택 변수
  const [isPublic, setisPublic] = useState<boolean>(false);

  // 공개 옵션 라디오버튼 클릭 시 처리
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newOpenValue = e.target.value === 'true';
    setisPublic(newOpenValue);
  };

  // 프레임, 최종캔버스 ref
  const frameRef = useRef<HTMLImageElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);

  //사진 저장 클릭 시 처리
  const handleSaveClick = () => {
    combinePhotos();
    setIsInfoModalOpen(true);
  };

  const combinePhotos = () => {
    const thisCanvasRef = finalCanvasRef as RefObject<HTMLCanvasElement>;
    const finalCanvas = thisCanvasRef.current;

    if (!finalCanvas) return;
    const ctxFinal = finalCanvas.getContext('2d');

    if (!ctxFinal) return;
    // 배경 흰색 채우기
    ctxFinal.fillStyle = 'white';
    ctxFinal.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    const startX = (frameWidth - photoWidth) / 2;
    const startY = 16;

    // 사진 채우기
    for (let i = 0; i < photoCount; i++) {
      const thisPhotoRef = refArray[i] as RefObject<HTMLCanvasElement>;
      const thisPhoto = thisPhotoRef.current;
      if (!thisPhoto) return;
      ctxFinal.drawImage(thisPhoto, startX, startY + (photoHeight + 11) * i);
    }

    // 프레임 맨 위에 그리기
    const image = new Image();
    image.src = frameUrl;

    image.onload = async () => {
      const imgWidth = image.width;
      const imgHeight = image.height;

      // 캔버스에 이미지 그리기
      ctxFinal.drawImage(
        image,
        0,
        0,
        imgWidth,
        imgHeight,
        0,
        0,
        finalCanvas.width,
        finalCanvas.height,
      );
    };
  };

  return (
    <div className={styles.UploadContainer}>
      <div className={styles.FrameContainer}>
        <div
          className={styles.PhotoContainer}
          style={{ height: frameWidth * 3 }}
        >
          <ImageNext
            ref={frameRef}
            src={frameUrl}
            alt="프레임"
            width={frameWidth}
            height={frameWidth * 3}
            className={styles.Frame}
          />
          {layerArray.map((layer, i) => (
            <PhotoLayer
              key={layer}
              index={layer}
              requestIndex={requestIndex}
              photoWidth={photoWidth}
              photoHeight={photoHeight}
              setRequestIndex={setRequestIndex}
              setImageData={setImageData}
              setIsModalOpen={setIsModalOpen}
              imageData={imageData}
              ref={refArray[i]}
            />
          ))}
        </div>
      </div>
      <div className={styles.RadioContainer}>
        <label className={styles.TextContainer}>
          <input
            type="radio"
            name="open"
            value="false"
            onChange={handleRadioChange}
            checked={isPublic === false}
            className={styles.RadioInput}
          />
          <span className={styles.Text}>나만 보기</span>
        </label>
        <label className={styles.TextContainer}>
          <input
            type="radio"
            name="open"
            value="true"
            onChange={handleRadioChange}
            checked={isPublic === true}
            className={styles.RadioInput}
          />
          <span className={styles.Text}>자랑하기</span>
        </label>
      </div>

      <div className={styles.BtnContainer}>
        <Button
          type="button"
          size="small"
          backgroundColor="orange"
          icon={false}
          onClick={handleSaveClick}
        >
          사진 저장
        </Button>
      </div>
      <canvas
        ref={finalCanvasRef}
        width={frameWidth}
        height={frameWidth * 3}
        className={styles.FinalCanvas}
      />
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <PhotoRegistForm
            setIsOpen={setIsModalOpen}
            setImageData={setImageData}
            photoWidth={photoWidth}
            photoHeight={photoHeight}
          />
        </Modal>
      )}
      {isInfoModalOpen && (
        <Modal setIsOpen={setIsInfoModalOpen}>
          <InfoRegistForm isPublic={isPublic} setIsOpen={setIsInfoModalOpen} />
        </Modal>
      )}
    </div>
  );
};

export default PhotoUpload;
