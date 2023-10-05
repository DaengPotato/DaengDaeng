import Image from 'next/image';

import Logo from '@/public/images/logo192.png';
import SymbolGoogle from '@/public/images/symbol-google.png';
import SymbolKakao from '@/public/images/symbol-kakao.png';
import TextLogo from '@/public/images/text-logo.png';

import styles from './index.module.scss';

const Login = () => {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/login?type=KAKAO`,
    });
  }

  function googleLogin() {
    const googleAuthUrl =
      'https://accounts.google.com/o/oauth2/auth?client_id=' +
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID +
      '&redirect_uri=' +
      process.env.NEXT_PUBLIC_REDIRECT_URL +
      '/login?type=GOOGLE' +
      '&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid';
    window.location.href = googleAuthUrl;
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
        <button
          className={`${styles.Body} ${styles.LoginGoogle}`}
          onClick={googleLogin}
        >
          <Image src={SymbolGoogle} height={24} alt="login-google" />
          <span>Google로 로그인하기</span>
        </button>
      </section>
    </div>
  );
};

export default Login;
