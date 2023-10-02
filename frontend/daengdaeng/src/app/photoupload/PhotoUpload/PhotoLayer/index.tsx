'use client';

// import type { ChangeEvent } from 'react';
import type { ForwardedRef, RefObject } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';

import { AddIcon } from '@/public/icons';
import { white } from '@/src/styles/colors';

import styles from './index.module.scss';

type PhotoLayerProps = {
  index: number;
  requestIndex: number;
  photoWidth: number;
  photoHeight: number;
  setRequestIndex: React.Dispatch<React.SetStateAction<number>>;
  setImageData: React.Dispatch<React.SetStateAction<ImageData | undefined>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageData: ImageData | undefined;
  // ref: React.RefObject<HTMLCanvasElement>;
};

// const PhotoLayer = forwardRef<HTMLCanvasElement, PhotoLayerProps>(
const PhotoLayer = forwardRef(
  (
    {
      index,
      requestIndex,
      photoWidth,
      photoHeight,
      setRequestIndex,
      setImageData,
      setIsModalOpen,
      imageData,
    }: PhotoLayerProps,
    ref: ForwardedRef<HTMLCanvasElement>,
  ) => {
    const canvasRef = ref as RefObject<HTMLCanvasElement>;

    const [isFilled, setIsFilled] = useState<boolean>(false);
    // + 클릭 시 input 클릭 오픈
    const handlePlusClick = () => {
      setRequestIndex(index);
      setIsModalOpen(true);
    };

    // // x 클릭 시 input 리셋 및 캔버스 지우기
    // const handleCloseClick = () => {
    //   // 캔버스 지우기

    //   const canvas = canvasRef.current;

    //   if (!canvas) return;
    //   const ctx = canvas.getContext('2d');

    //   if (!ctx) return;
    //   ctx.reset();
    // };

    // 요청했던 인덱스라면 캔버스 업데이트
    useEffect(() => {
      if (imageData && index === requestIndex) {
        if (!canvasRef) return;
        const canvas = canvasRef.current;

        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.putImageData(imageData, 0, 0);
        }
        setImageData(undefined);
        setRequestIndex(-1);
        setIsFilled(true);
      }
    }, [
      imageData,
      index,
      requestIndex,
      setRequestIndex,
      canvasRef,
      setImageData,
    ]);

    // 최초 렌더링 시 캔버스 검은 색으로 칠하기
    useEffect(() => {
      const thisCanvasRef = canvasRef as RefObject<HTMLCanvasElement>;
      const canvas = thisCanvasRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = 'black';
      ctx?.fillRect(0, 0, photoWidth, photoHeight);
    }, [canvasRef, photoHeight, photoWidth]);

    return (
      <div className={styles.PhotoContainer}>
        <button
          className={styles.AddButton}
          onClick={handlePlusClick}
          style={{ visibility: isFilled ? 'hidden' : 'visible' }}
        >
          <AddIcon width={20} height={20} fill={white} />
        </button>
        <div className={styles.CanvasContainer}>
          <canvas
            ref={canvasRef}
            width={photoWidth}
            height={photoHeight}
            className={styles.ShowCanvas}
            onClick={handlePlusClick}
          />
        </div>
        {/* <button className={styles.CloseButton} onClick={handleCloseClick}>
          <AddIcon width={20} height={20} fill={white} />
        </button> */}
      </div>
    );
  },
);

PhotoLayer.displayName = 'PhotoLayer';

export default PhotoLayer;
