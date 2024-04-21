// utils/auth-utils.ts
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    window.location.href = '/pages/login'; // redirects to login page
  }
};
