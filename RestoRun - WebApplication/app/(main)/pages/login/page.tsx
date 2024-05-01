'use client';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { useRouter } from 'next/navigation';
import {useContext, useEffect, useState} from 'react';
import { useAuth } from '../../utilities/useAuth';
import {AuthProvider} from "../../utilities/authContext"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const { isAuthenticated, login } = useAuth();
    const isAuthenticated = useAuth().authContext.isAuthenticated;
    const login = useAuth().authContext.login;
    const router = useAuth().router;
    //const router = useRouter();
    //const [isMounted, setIsMounted] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const [loginError, setLoginError] = useState('');
    const [checked, setChecked] = useState(false);

    /*useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false); // ceanup function to set isMounted to false when the component unmounts
    }, []);*/

    useEffect(() => {
        // redirect if already authenticated
        if (isAuthenticated /*&& typeof window !== 'undefined'*/) {
            router.push('/pages/dashboard'); // Update the route as needed
        }
    }, [/*isAuthenticated, router*/]);

    const onLoginClick = async () => {
        try {
            await login(email, password);
            router.push('/pages/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    );

    return (
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center">
                    <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                    <div
                        style={{
                            borderRadius: '56px',
                            padding: '0.3rem',
                            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                        }}
                    >
                        <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                            <div className="text-center mb-5">
                                <div className="text-900 text-3xl font-medium mb-3">Welcome!</div>
                                <span className="text-600 font-medium">Sign in to continue</span>
                            </div>

                            <div>
                                <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                    Email
                                </label>
                                <InputText id="email1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                                <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                    Password
                                </label>
                                <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                    <div className="flex align-items-center">
                                        <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                        <label htmlFor="rememberme1">Remember me</label>
                                    </div>
                                    <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                        Forgot password?
                                    </a>
                                </div>
                                {
                                    loginError && (
                                        <div className="alert alert-danger" role="alert">
                                            {loginError}
                                        </div>
                                    )
                                }
                                <Button label="Sign In" className="w-full p-3 text-xl" onClick={onLoginClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default LoginPage;
