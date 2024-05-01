// _app.tsx
import { AppProps } from 'next/app'; // For typing props
import { AuthProvider } from '../utilities/authContext'; // Adjust path as needed

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
