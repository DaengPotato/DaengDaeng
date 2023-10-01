'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.scss';
import Sidebar from '../Sidebar';

import { HamburgerMenuIcon } from '@/public/icons';
import BlankProfileImg from '@/public/images/blank-profile.webp';
import TextLogo from '@/public/images/text-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOpenSideMenuBar = () => {
    setIsMenuOpen((prev) => !prev);
    const rootDiv = document.querySelector<HTMLDivElement>('#rootDiv');
    rootDiv!.style.overflow = 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsMenuOpen(false);
    const rootDiv = document.querySelector<HTMLDivElement>('#rootDiv');
    rootDiv!.style.overflow = 'auto';
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <button
          onClick={handleOpenSideMenuBar}
          className={styles.hamburgerMenuBtn}
        >
          <HamburgerMenuIcon width="40px" height="40px" />
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
        <>
          <div className={styles.background} onClick={handleCloseSidebar}></div>
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </>
      )}
    </div>
  );
};

export default Header;
