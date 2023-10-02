'use client';

import React from 'react';

import { ssurround } from '@/src/styles/fonts';

import styles from './index.module.scss';

type PhotoCanvasProps = {
  placeName: String;
  placeAddress: String;
  backgroundColor: 'orange' | 'white';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const PlaceListCard = ({
  placeName,
  placeAddress,
  backgroundColor,
  onClick,
}: PhotoCanvasProps) => {
  const reformAddress = (address: String) => {
    const words = address.split(/\s+/);
    return `${words[0]} ${words[1]}`;
  };
  return (
    <div
      className={`
    ${styles.CardContainer}
    ${styles[`bg-${backgroundColor}`]}
    ${ssurround.className}
  `}
      onClick={onClick}
    >
      <div className={styles.NameText}>{placeName}</div>
      <div className={styles.AddressText}>
        {placeAddress ? reformAddress(placeAddress) : ''}
      </div>
    </div>
  );
};

export default PlaceListCard;
