'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HamburgerMenuIcon, PawIcon } from '@/public/icons';
import TextLogo from '@/public/images/text-logo.png';
import { getUser } from '@/src/hooks/useLocalStorage';

import styles from './index.module.scss';
import BottomSheet from '../common/BottomSheet';
import Login from '../Login';
import Sidebar from '../Sidebar';

const Header = () => {
  const router = useRouter();
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

  const handleProfile = () => {
    if (!getUser()) {
      setIsLoginOpen((prev) => !prev);
    } else {
      router.push('/mypets');
    }
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
          <div className={styles.profileImg} onClick={handleProfile}>
            <PawIcon fill="black" width={30} height={30} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div className={styles.background} onClick={handleCloseSidebar}></div>
          <Sidebar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setIsLoginOpen={setIsLoginOpen}
          />
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
