
const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    // Simulate checking credentials (you could add more logic here)
    if (credentials.email === 'admin@example.com') {
      return { token: 'mock-token-admin', userType: 'admin' };
    } else if (credentials.email === 'restaurant@example.com') {
      return { token: 'mock-token-restaurant', userType: 'restaurant' };
    } else if (credentials.email === 'chef@example.com') {
      return { token: 'mock-token-chef', userType: 'chef' };
    } else {
      throw new Error('Login failed');
    }
  }
  /*login: async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const {token, userType} = await response.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', userType); // Store the user type
    }
    return {token, userType};
  }*/
};

  
  export default AuthService;