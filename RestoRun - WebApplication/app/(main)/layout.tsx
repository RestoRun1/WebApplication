// layout.tsx
import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { AuthProvider } from './utilities/authContext';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Restorun',
    description: 'The ultimate collection of design-agnostic, flexible, and accessible React UI Components.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'Restorun',
        url: 'https://sakai.primereact.org/',
        description: 'The ultimate collection of design-agnostic, flexible, and accessible React UI Components.',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

function AppLayout({ children }: AppLayoutProps) {
    return (
        <AuthProvider>
            <Layout>{children}</Layout>
        </AuthProvider>
    );
}

export default AppLayout;