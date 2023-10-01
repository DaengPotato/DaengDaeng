import type { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import Button from '../common/Button';

import { CloseIcon } from '@/public/icons';
import TextLogo from '@/public/images/text-logo.png';
import {
  getUser,
  removeUser,
  removeUserInfo,
} from '@/src/hooks/useLocalStorage';

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
    label: '댕댕네컷',
    href: '/daengphoto',
  },
  {
    label: '여행지 검색',
    href: '/placesearch',
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

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    const rootDiv = document.querySelector<HTMLDivElement>('#rootDiv');
    rootDiv!.style.overflow = 'auto';
  };

  const handleClickLogin = () => {
    router.push('/login');
    handleCloseMenu();
  };

  const logout = async () => {
    try {
      const token = getUser();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/member/logout`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.status === 200) {
        alert('로그아웃');
        removeUser();
        removeUserInfo();
        const now = new Date();
        document.cookie = `daengCookie=; expires=${now.toUTCString()}; path=/;`;
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류가 발생하였습니다.', error);
      alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = getUser();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

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

  return (
    <div className={`${styles.Sidebar} ${isMenuOpen ? 'open' : ''}`}>
      <div className={styles.header}>
        <button onClick={handleCloseMenu} className={styles.closeBtn}>
          <CloseIcon width="30px" height="30px" />
        </button>
        <div className={styles.iconContainer}>
          <Link href="/" onClick={handleCloseMenu}>
            <Image src={TextLogo} height={25} alt="textlogo" />
          </Link>
        </div>
      </div>
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
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.label} className={styles.menuItem}>
            <Link href={item.href} onClick={handleCloseMenu}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.bottom}>
        <button className={styles.userBtn} onClick={logout}>
          로그아웃
        </button>
        <button className={styles.userBtn} onClick={handleDeleteButtonClick}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
