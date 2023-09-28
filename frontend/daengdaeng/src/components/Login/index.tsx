import Image from 'next/image';

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
    </div>
  );
};

export default Login;
