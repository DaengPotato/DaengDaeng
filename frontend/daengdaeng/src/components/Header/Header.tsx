'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { HambergerMenuIcon } from '@/public/icons';
import BlankProfileImg from '@/public/images/blank-profile.webp';
import TextLogo from '@/public/images/text-logo.png';

import styles from './Header.module.scss';
import Sidebar from '../Sidebar/Sidebar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOpenSideMenuBar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <button onClick={handleOpenSideMenuBar}>
          <HambergerMenuIcon width="40px" height="40px" />
        </button>
        <div className={styles.iconContainer}>
          <Link href="/">
            <Image src={TextLogo} height={25} alt="textlogo" />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.profileImg}>
          <Image src={BlankProfileImg} width={40} height={40} alt="profile" />
        </div>
      </div>
      {isMenuOpen && (
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </div>
  );
};

export default Header;
