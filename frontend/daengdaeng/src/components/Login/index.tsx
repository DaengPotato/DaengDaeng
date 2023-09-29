import Image from 'next/image';

import Logo from '@/public/images/logo192.png';
import TextLogo from '@/public/images/text-logo.png';
import SymbolGoogle from '@/public/images/symbol-google.png';
import SymbolKakao from '@/public/images/symbol-kakao.png';

import styles from './index.module.scss';

const Login = () => {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/kakao`,
    });
  }

  return (
    <div>
      <section className={styles.Logo}>
        <Image src={Logo} height={130} alt="logo" />
        <Image src={TextLogo} height={50} alt="text-logo" />
      </section>
      <section className={styles.LoginBtn}>
        <button
          className={`${styles.Body} ${styles.LoginKakao}`}
          onClick={kakaoLogin}
        >
          <Image src={SymbolKakao} height={24} alt="logo-kakao" />
          <span>카카오로 로그인하기</span>
        </button>
        <button className={`${styles.Body} ${styles.LoginGoogle}`}>
          <Image src={SymbolGoogle} height={24} alt="login-google" />
          <span>Google로 로그인하기</span>
        </button>
      </section>
    </div>
  );
};

export default Login;
