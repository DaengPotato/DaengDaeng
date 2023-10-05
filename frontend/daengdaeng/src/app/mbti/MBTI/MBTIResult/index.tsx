import React, { useEffect, useState } from 'react';

import html2canvas from 'html2canvas';
import Image from 'next/image';

import { PawIcon } from '@/public/icons';
import { updateMBTI } from '@/src/apis/api/mbti';
import { mbtiTypes } from '@/src/constants/mbti';
import { mbtiContent } from '@/src/constants/mbti';
import { gray, lightOrange } from '@/src/styles/colors';

import styles from './index.module.scss';

import type { PetDetail } from '@/src/types/pet';

type MBTIResultProps = {
  pet: PetDetail;
  selectedTypes: string[];
};

const MBTIResult = ({ pet, selectedTypes }: MBTIResultProps) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const [mbti, setMbti] = useState<string[]>([]);

  const typeCounts = selectedTypes.reduce(
    (counts: { [key: string]: number }, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    },
    {},
  );

  const doCopy = () => {
    if (navigator.clipboard) {
      let currentUrl = window.document.location.href;
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          alert('클립보드에 복사되었습니다.');
        })
        .catch(() => {
          alert('복사를 다시 시도해주세요.');
        });
    }
  };

  const doSave = () => {
    const elementToCapture = document.querySelector(`.${styles.MBTIResult}`);
    if (elementToCapture instanceof HTMLElement) {
      elementToCapture.style.backgroundColor = lightOrange; // 원하는 배경색 설정
      html2canvas(elementToCapture, {
        width: 390,
        height: 600,
      }).then(function (canvas) {
        alert('저장되었습니다.');

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = '댕bti_결과.png';
        link.click();
      });
    } else {
      console.error('요소를 찾을 수 없습니다.');
    }
  };

  useEffect(() => {
    (async () => {
      const mbtiType = mbtiTypes.reduce((acc: string[], types: string[]) => {
        if (typeCounts[types[0]] > 1) acc.push(types[0]);
        else acc.push(types[2]);
        return acc;
      }, []);

      setMbti(mbtiType);

      await updateMBTI(pet.petId, {
        mbti: mbtiType.join(''),
      });
    })();
  }, []);

  return (
    <div className={styles.MBTIResult}>
      <div className={styles.petMbti}>
        <div className={styles.petTitle}>
          <span className={styles.petName} color="lightOrange">
            {pet.name}
          </span>
          의 댕bti는?
        </div>
        <div className={styles.mbti}>{mbti.join('')}</div>
        <div className={styles.petImage}>
          {!imgError && typeof pet.image === 'string' ? (
            <Image
              src={pet.image}
              alt="pet img"
              fill={true}
              blurDataURL={pet.image}
              placeholder="blur"
              onError={() => setImgError(true)}
            />
          ) : (
            <PawIcon fill={gray} width={100} height={100} />
          )}
        </div>

        <div className={styles.mbtiContet}>
          {mbti.length > 0 &&
            mbtiContent[mbti.join('')]?.map((item, index) => (
              <div key={index} className={styles.mbtiText}>
                {item}
              </div>
            ))}
        </div>

        <div className={styles.mbtiRatioList}>
          {mbtiTypes.map((types, i) => {
            const count: number = typeCounts[types[0]];
            let widthClass: string;

            if (count === 1) widthClass = styles.oneThird;
            else if (count === 2) widthClass = styles.twoThirds;
            else widthClass = styles.full;

            return (
              <div className={styles.mbtiRatio} key={i}>
                <div>
                  <div
                    className={`${styles.type} ${
                      count > 1 ? `${styles.selected}` : ''
                    }`}
                  >
                    {types[0]}
                  </div>
                  <div
                    className={`${styles.typeDetail} ${
                      count > 1 ? `${styles.selected}` : ''
                    }`}
                  >
                    {types[1]}
                  </div>
                </div>
                <div className={styles.progress}>
                  <div
                    className={`${styles.progressBar} ${widthClass} ${
                      count > 1 ? `${styles.left}` : ''
                    }`}
                  ></div>
                </div>
                <div>
                  <div
                    className={`${styles.type} ${
                      count > 1 ? '' : `${styles.selected}`
                    }`}
                  >
                    {types[2]}
                  </div>
                  <div
                    className={`${styles.typeDetail} ${
                      count > 1 ? '' : `${styles.selected}`
                    }`}
                  >
                    {types[3]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.btns} data-html2canvas-ignore="true">
          <Image
            src="/images/shareBtn.png"
            alt="링크 복사"
            width={40}
            height={40}
            onError={() => setImgError(true)}
            style={{ margin: '10px' }}
            onClick={doCopy}
          />
          <Image
            src="/images/downloadBtn.png"
            alt="이미지 저장"
            width={40}
            height={40}
            onError={() => setImgError(true)}
            style={{ margin: '10px' }}
            onClick={doSave}
          />
        </div>
      </div>
    </div>
  );
};

export default MBTIResult;
