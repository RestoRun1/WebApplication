// useAuth.tsx
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from './authContext';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined' && authContext && !authContext.loading) {
      if (!authContext.isAuthenticated) {
        router.push('/pages/pages/login');
      }
    }
  }, [authContext, router, hasMounted]);

  if (!authContext) {
    throw new Error("AuthContext is not initialized, AuthProvider must wrap the parent component");
  }

  return {"login":authContext.login, "authContext":authContext, "router":router};
};
