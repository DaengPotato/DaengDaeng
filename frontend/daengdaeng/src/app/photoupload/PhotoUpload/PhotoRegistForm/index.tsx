/* eslint-disable no-null/no-null */
'use client';

import type { ChangeEvent } from 'react';
import React, { useRef, useState } from 'react';

import Button from '@/src/components/common/Button';

import styles from './index.module.scss';

type PhotoRegistFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageData: React.Dispatch<React.SetStateAction<ImageData | undefined>>;
  setIsCombined: React.Dispatch<React.SetStateAction<boolean>>;
  photoWidth: number;
  photoHeight: number;
};

const PhotoRegistForm = ({
  setIsOpen,
  setImageData,
  setIsCombined,
  photoWidth,
  photoHeight,
}: PhotoRegistFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const reSizedCanvasRef = useRef<HTMLCanvasElement>(null);
  const selectCanvasRef = useRef<HTMLCanvasElement>(null);

  // 이미지 표시 최대
  const maxWidth = 360;
  const maxHeight = 600;

  // 확대 관련
  const [range, setRange] = useState<number>(1.0);
  const minRange = 1;
  const maxRange = 3;
  const stepRange = 0.1;

  const [currX, setCurrX] = useState<number>(0);
  const [currY, setCurrY] = useState<number>(0);

  const [isMoving, setIsMoving] = useState<boolean>(false);

  // 마우스 다운 이벤트
  const handleMouseDown = () => {
    setIsMoving(true);
  };

  // 마우스무브 이벤트
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMoving) {
      return;
    }

    const baseCanvas = baseCanvasRef.current;

    // 이동량
    const { movementX, movementY } = e.nativeEvent;

    // 이동 후 위치 계산
    const sumX = currX - movementX * range;
    const sumY = currY - movementY * range;

    // 최대 이동가능 위치 계산
    if (!baseCanvas) return;

    const maxX = baseCanvas.width - baseCanvas.width / range;
    const maxY = baseCanvas.height - baseCanvas.height / range;

    // 범위 커팅
    const newX = sumX < 0 ? 0 : sumX > maxX ? maxX : sumX;
    const newY = sumY < 0 ? 0 : sumY > maxY ? maxY : sumY;

    // 리사이즈 캔버스 그리기
    paintResizedCanvas(range, newX, newY);

    // 새 위치 저장
    setCurrX(newX);
    setCurrY(newY);
  };

  // 마우스 업 이벤트
  const handleMouseUp = () => {
    setIsMoving(false);
  };

  //마우스가 캔버스 벗어날 때 이벤트
  const handleMouseLeave = () => {
    setIsMoving(false);
  };

  // 확대 범위 변화 시 처리
  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRange = parseFloat(e.target.value);
    setRange(newRange);

    // 리사이즈 캔버스 그리기
    paintResizedCanvas(newRange, currX, currY);
  };

  // 리사이즈 캔버스 그리기
  const paintResizedCanvas = (newRange: number, posX: number, posY: number) => {
    const baseCanvas = baseCanvasRef.current;
    if (!baseCanvas) return;

    const reSizedCanvas = reSizedCanvasRef.current;
    if (!reSizedCanvas) return;

    const ctxReSized = reSizedCanvas.getContext('2d');
    if (!ctxReSized) return;

    const newWidth = baseCanvas.width / newRange;
    const newHeight = baseCanvas.height / newRange;

    ctxReSized.reset();

    ctxReSized.drawImage(
      baseCanvas,
      posX,
      posY,
      newWidth,
      newHeight,
      0,
      0,
      reSizedCanvas.width,
      reSizedCanvas.height,
    );
  };

  // 파일 입력 시 처리
  const handleOnchangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    // 파일 없으면 종료
    if (!e.currentTarget.files) {
      return;
    }

    // 파일 가져오기
    const imgFile = e.currentTarget.files[0];

    // 입력된 파일이 없으면 종료
    if (!imgFile) {
      return;
    }

    // 캔버스에 입력
    if (!baseCanvasRef.current) {
      return;
    }
    const baseCanvas = baseCanvasRef.current;
    const ctxBase = baseCanvas.getContext('2d');

    const selectCanvas = selectCanvasRef.current;
    if (!selectCanvas) return;
    const ctxSelect = selectCanvas.getContext('2d');

    if (ctxBase) {
      const image = new Image();
      image.src = URL.createObjectURL(imgFile);

      image.onload = async () => {
        const imgWidth = image.width;
        const imgHeight = image.height;

        // 캔버스를 이미지 크기에 맞게 조정
        const changedWidth = (maxHeight * imgWidth) / imgHeight;
        const changedHeight = (maxWidth * imgHeight) / imgWidth;

        if (imgWidth > maxWidth) {
          if (changedHeight > maxHeight) {
            updateCanvasSize(changedWidth, maxHeight);
          } else {
            updateCanvasSize(maxWidth, changedHeight);
          }
        } else {
          if (imgHeight > maxHeight) {
            updateCanvasSize(changedWidth, maxHeight);
          } else {
            updateCanvasSize(imgWidth, imgHeight);
          }
        }

        // 베이스 캔버스에 이미지 그리기
        ctxBase.drawImage(
          image,
          0,
          0,
          imgWidth,
          imgHeight,
          0,
          0,
          baseCanvas.width,
          baseCanvas.height,
        );

        // 리사이즈 캔버스에 이미지 그리기
        paintResizedCanvas(range, currX, currY);

        // 선택 캔버스에 선택 칸 그리기
        if (!ctxSelect) return;
        ctxSelect.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctxSelect.fillRect(0, 0, selectCanvas.width, selectCanvas.height);

        ctxSelect.clearRect(
          (selectCanvas.width - photoWidth) / 2,
          (selectCanvas.height - photoHeight) / 2,
          photoWidth,
          photoHeight,
        );
      };
    }
  };

  // 캔버스 사이즈 조절
  const updateCanvasSize = (newWidth: number, newHeight: number) => {
    // 캔버스들
    const baseCanvas = baseCanvasRef.current;
    const reSizedCanvas = reSizedCanvasRef.current;
    const selectCanvas = selectCanvasRef.current;

    if (!baseCanvas || !reSizedCanvas || !selectCanvas) return;

    baseCanvas.width = newWidth;
    baseCanvas.height = newHeight;

    reSizedCanvas.width = newWidth;
    reSizedCanvas.height = newHeight;

    selectCanvas.width = newWidth;
    selectCanvas.height = newHeight;
  };

  // 사진 고르기 버튼 입력 시 처리
  const handleSelectClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  // 취소 버튼 입력 시 처리
  const handleCancelClick = () => {
    setIsOpen(false);
  };

  // 등록 버튼 입력 시 처리
  const handleRegistClick = () => {
    const reSizedCanvas = reSizedCanvasRef.current;
    if (!reSizedCanvas) return;
    const ctxReSized = reSizedCanvas.getContext('2d');
    if (!ctxReSized) return;
    const newImageData = ctxReSized.getImageData(
      (reSizedCanvas.width - photoWidth) / 2,
      (reSizedCanvas.height - photoHeight) / 2,
      photoWidth,
      photoHeight,
    );
    setImageData(newImageData);
    setIsOpen(false);
    setIsCombined(false);
  };

  return (
    <div className={styles.PhotoRegistForm}>
      <div className={styles.registForm}>
        <div className={styles.CanvasContainer}>
          <canvas
            ref={selectCanvasRef}
            width={photoWidth}
            height={photoHeight}
            className={styles.SelectCanvas}
          />
          <canvas
            ref={reSizedCanvasRef}
            width={photoWidth}
            height={photoHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={styles.ReSizedCanvas}
          />

          <canvas
            ref={baseCanvasRef}
            width={photoWidth}
            height={photoHeight}
            className={styles.BaseCanvas}
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          className={styles.FileInput}
          onChange={handleOnchangeInput}
        />
        <div className={styles.buttons}>
          <Button
            type="button"
            size="small"
            backgroundColor="gray"
            onClick={handleSelectClick}
            icon={true}
          >
            사진 고르기
          </Button>
        </div>
        <div className={styles.TextContainer}>
          <span className={styles.Text}>축소</span>
          <input
            type="range"
            min={minRange}
            max={maxRange}
            step={stepRange}
            value={range}
            onChange={handleRangeChange}
            className={styles.SizeBar}
          />
          <span className={styles.Text}>확대</span>
        </div>

        <div className={styles.buttons}>
          <Button
            type="button"
            size="small"
            backgroundColor="gray"
            onClick={handleCancelClick}
            icon={true}
          >
            취소
          </Button>
          <Button
            size="small"
            backgroundColor="orange"
            onClick={handleRegistClick}
            icon={true}
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoRegistForm;
