import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../utilities/authContext'; // Ensure this path is correct to your authContext.tsx file

const useAuth = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Check if the auth context is ready and if the user is authenticated
    if (authContext && !authContext.loading) {
      // If there's no user, redirect to the login page
      if (!authContext.isAuthenticated) {
        router.push('/pages/auth/login');
      }
    }
  }, [authContext, router]);

  // You can return the whole authContext or destructure what you need
  return authContext;
}

export default useAuth;
