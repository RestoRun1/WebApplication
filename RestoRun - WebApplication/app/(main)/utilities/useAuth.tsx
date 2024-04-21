import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Only attempt to use the router when it's ready and on the client side
    if (router.isReady && typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/pages/auth/login');
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [router.isReady]); // Depend on router.isReady to re-check when the router becomes ready

  return { isLoggedIn };
}

export default useAuth;
