import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/pages/auth/login');
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [router.isReady]);

  return { isLoggedIn };
}

export default useAuth;
