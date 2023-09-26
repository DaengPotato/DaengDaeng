import type { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { CloseIcon } from '@/public/icons';
import TextLogo from '@/public/images/text-logo.png';

import styles from './index.module.scss';

const menuItems = [
  {
    label: '나의 강아지',
    href: '/mypets',
  },
  {
    label: '댕BTI 검사',
    href: '/mbtitest',
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
    label: 'Login',
    href: '/login',
  },
];

const Sidebar = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
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
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.label} className={styles.menuItem}>
            <Link href={item.href} onClick={handleCloseMenu}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
