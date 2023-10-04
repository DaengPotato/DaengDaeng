import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import ProfileForm from './ProfileForm';
import Button from '../common/Button';
import Modal from '../common/Modal';

import type { UserInfo } from '@/src/types/member';

import { CloseIcon, PawIcon } from '@/public/icons';
import TextLogo from '@/public/images/text-logo.png';
import { deleteMember, logout } from '@/src/apis/api/member';
import { menuItems } from '@/src/constants/nav';
import {
  getUser,
  getUserInfo,
  removeUser,
  removeUserInfo,
} from '@/src/hooks/useLocalStorage';

import styles from './index.module.scss';
import Button from '../common/Button';

const menuItems = [
  {
    label: '나의 강아지',
    href: '/mypets',
  },
  {
    label: '댕BTI 검사',
    href: '/mbti',
  },
  {
    label: '여행지 추천',
    href: '/placerecommendation',
  },
  {
    label: '여행지 검색',
    href: '/placesearch',
  },
  {
    label: '댕댕네컷',
    href: '/daengphoto',
  },
  {
    label: '리뷰',
    href: '/placereview',
  },
];

const Sidebar = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [editingNickname, setEditingNickname] = useState<boolean>(false);

  useEffect(() => {
    setIsLogin(typeof getUser() === 'string');
    setUserInfo(getUserInfo());
  }, [isMenuOpen]);

  useEffect(() => {
    setUserInfo(getUserInfo());
  }, [editingNickname]);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    const rootDiv = document.querySelector<HTMLDivElement>('#rootDiv');
    rootDiv!.style.overflow = 'auto';
  };

  const handleClickLogin = () => {
    router.push('/login');
    handleCloseMenu();
  };

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.status === 200) {
        alert('로그아웃 되었습니다.');
        removeUser();
        removeUserInfo();
        setIsLogin(false);
        const now = new Date();
        document.cookie = `daengCookie=; expires=${now.toUTCString()}; path=/;`;
        handleCloseMenu();
        router.replace('/');
        router.refresh();
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류가 발생하였습니다.', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteMember();

      if (res.status === 200) {
        alert('그동안 댕댕감자를 이용해주셔서 감사합니다');
        removeUser();
        removeUserInfo();
        const now = new Date();
        document.cookie = `daengCookie=; expires=${now.toUTCString()}; path=/;`;
      } else {
        throw new Error('회원 탈퇴 실패');
      }
    } catch (error) {
      console.error('회원 탈퇴 중 오류가 발생하였습니다.', error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteButtonClick = () => {
    const confirmDelete = window.confirm('정말 댕댕감자를 떠나시겠습니까? 😢');
    if (confirmDelete) {
      handleDeleteAccount();
    }
  };

  const handleEditUserInfo = () => {
    setEditingNickname(true);
  };

  const handleCloseEditNickname = () => {
    setEditingNickname(false);
  };

  return (
    <div className={`${styles.Sidebar} ${isMenuOpen ? 'open' : ''}`}>
      <div className={styles.header}>
        <button onClick={handleCloseMenu} className={styles.closeBtn}>
          <CloseIcon width="30px" height="30px" />
        </button>
        <div className={styles.iconContainer} onClick={handleCloseMenu}>
          <Link href="/">
            <Image src={TextLogo} height={25} alt="textlogo" />
          </Link>
        </div>
      </div>
      {!isLogin ? (
        <div className={styles.login}>
          <Button
            size={'small'}
            backgroundColor={'orange'}
            icon={true}
            onClick={handleClickLogin}
          >
            로그인
          </Button>
        </div>
      ) : (
        <div>
          <div className={styles.userInfo}>
            <div className={styles.userNickname}>
              <span className={styles.nickname}>{userInfo?.nickname}</span>님
              <PawIcon width={20} height={20} fill="black" />
            </div>
            <div className={styles.userEmail}>
              <div className={styles.emailLine}>
                {userInfo?.email.split('@')[0]}
              </div>
              <div className={styles.emailLine}>
                @{userInfo?.email.split('@')[1]}
              </div>
            </div>
            <div className={styles.userInfoBtnGroup}>
              <button className={styles.userInfoBtn} onClick={handleLogout}>
                로그아웃
              </button>
              <button
                className={styles.userInfoBtn}
                onClick={handleEditUserInfo}
              >
                닉네임변경
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={styles.menuItem}
            onClick={handleCloseMenu}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      {isLogin && (
        <div className={styles.bottom}>
          <button
            className={styles.deleteBtn}
            onClick={handleDeleteButtonClick}
          >
            탈퇴하기
          </button>
        </div>
      )}
      {editingNickname && userInfo && (
        <div className={styles.nicknameModal}>
          <Modal closeModal={handleCloseEditNickname}>
            <ProfileForm
              closeForm={handleCloseEditNickname}
              userInfo={userInfo}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
