import React, { ComponentType, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

const withAuth = <P extends {}>(
    WrappedComponent: ComponentType<P>,
    allowedRoles: string[]
) => {
    const WithAuthComponent = (props: PropsWithChildren<P>) => {
        const router = useRouter();
        const userType = localStorage.getItem('userType');

        if (!allowedRoles.includes(userType || '')) {
            // TODO perform a redirect here
            if (typeof window !== 'undefined') {
                router.push('/not-authorized');
            }
            return null; // or some fallback UI
        }

        return <WrappedComponent {...props} />;
    };

    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithAuthComponent.displayName = `withAuth(${wrappedComponentName})`;

    return WithAuthComponent;
};

export default withAuth;
