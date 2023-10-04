'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { HamburgerMenuIcon, PawIcon } from '@/public/icons';
import BlankProfileImg from '@/public/images/blank-profile.webp';
import TextLogo from '@/public/images/text-logo.png';

import styles from './index.module.scss';
import BottomSheet from '../common/BottomSheet';
import Login from '../Login';
import Sidebar from '../Sidebar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

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

  const handleOpenLogin = () => {
    setIsLoginOpen((prev) => !prev);
  };

  return (
    <>
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
          <div className={styles.profileImg} onClick={handleOpenLogin}>
            <PawIcon fill="black" width={30} height={30} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div className={styles.background} onClick={handleCloseSidebar}></div>
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </>
      )}
      {isLoginOpen && (
        <>
          <BottomSheet isOpen={isLoginOpen} setIsOpen={setIsLoginOpen}>
            <Login />
          </BottomSheet>
        </>
      )}
    </>
  );
};

export default Header;
