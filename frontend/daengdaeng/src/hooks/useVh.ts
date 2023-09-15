import { useState, useCallback, useEffect } from 'react';

const useVh = (): number => {
  const isClient = typeof window === 'object';
  const [vh, setVh] = useState<number>(0);

  const updateVh = useCallback(() => {
    const innerHeight = Number((window.innerHeight * 0.01).toFixed(2));

    document.documentElement.style.setProperty('--vh', `${innerHeight}px`);
    setVh(innerHeight);
  }, [setVh]);

  useEffect(() => {
    if (!isClient) return;

    updateVh();
    window.addEventListener('resize', updateVh);

    return () => {
      window.removeEventListener('resize', updateVh);
    };
  }, [updateVh]);

  return vh;
};

export default useVh;
