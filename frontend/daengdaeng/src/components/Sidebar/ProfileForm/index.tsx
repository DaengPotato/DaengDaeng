import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import styles from './index.module.scss';
import Button from '../../common/Button';
import ErrorMessage from '../../ErrorMessage';

import type { UserInfo } from '@/src/types/member';
import type { FieldValues } from 'react-hook-form';

import { getIsAvailableNickname, updateNickname } from '@/src/apis/api/member';
import { getUser, saveUserInfo } from '@/src/hooks/useLocalStorage';

type profileFormProps = {
  closeForm: () => void;
  userInfo: UserInfo;
};

const ProfileForm = ({ closeForm, userInfo }: profileFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const [nicknameValue, setNicknameValue] = useState<string>(userInfo.nickname);
  const [isAvailableNickname, setIsAvailableNickname] = useState<boolean>(true);

  useEffect(() => {
    if (nicknameValue === '' || nicknameValue === userInfo.nickname) {
      return;
    }
    let timerId = setTimeout(async () => {
      // 닉네임 중복 검사 api 호출
      const token = getUser() as string;

      const res = await getIsAvailableNickname(token, nicknameValue);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        if (data) {
          setIsAvailableNickname(true);
        } else {
          setIsAvailableNickname(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [nicknameValue]);

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(event.target.value);
  };

  const handleRegist = async (data: FieldValues) => {
    if (!isAvailableNickname) return;

    if (data.nickname === userInfo.nickname) {
      closeForm();
    }

    const token = getUser() as string;
    const res = await updateNickname(token, data.nickname);

    if (res.ok) {
      saveUserInfo({
        ...userInfo,
        nickname: data.nickname,
      });
      closeForm();
    }
  };

  return (
    <div className={styles.ProfileForm}>
      <form className={styles.nicknameForm}>
        <div className={styles.title}>변경할 닉네임을 입력해주세요.</div>
        <div className={styles.formItem}>
          <input
            type="text"
            {...register('nickname', {
              value: userInfo.nickname,
              required: '닉네임을 입력해주세요.',
              maxLength: {
                value: 8,
                message: '8자 이하로 입력해주세요.',
              },
            })}
            onChange={handleNicknameChange}
            onKeyDown={handleFormKeyDown}
            className={styles.nicknameInput}
          />
          {errors?.nickname && errors?.nickname?.message && (
            <ErrorMessage>{errors?.nickname?.message}</ErrorMessage>
          )}
          {!errors.nickname &&
            nicknameValue !== '' &&
            (!isAvailableNickname ? (
              <ErrorMessage>이미 사용 중인 닉네임이에요...</ErrorMessage>
            ) : (
              <div className={styles.guideMessage}>
                사용 가능한 닉네임이에요!
              </div>
            ))}
        </div>
        <div className={styles.buttons}>
          <Button
            type="button"
            size="small"
            backgroundColor="gray"
            onClick={closeForm}
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
            완료
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
