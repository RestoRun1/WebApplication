/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        // Ensure that code runs only on the client side
        if (typeof window !== 'undefined') {
            const storedUserType = localStorage.getItem('userType'); // Retrieve user type from local storage
            setUserType(storedUserType);
        }
    }, []);

    // Define menu items conditionally based on the user type
    const menuItems: AppMenuItem[] = [
        ...(userType === 'restaurant' ? [
            {
                label: 'Restaurant',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        to: '/'
                    },
                    {
                        label: 'Staff',
                        icon: 'pi pi-fw pi-user',
                        to: '/pages/staff'
                    },
                    {
                        label: 'Events',
                        icon: 'pi pi-fw pi-calendar',
                        to: '/pages/events'
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-book',
                        to: '/pages/menu'
                    },
                    {
                        label: 'Reservations',
                        icon: 'pi pi-fw pi-ticket',
                        to: '/pages/reservations'
                    },
                    {
                        label: 'Orders',
                        icon: 'pi pi-fw pi-shopping-cart',
                        to: '/pages/orders'
                    },
                ]
            },
        ] : []),
        ...(userType === 'admin' ? [
            {
                label: 'Admin',
                items: [
                    {
                        label: 'Restaurants',
                        icon: 'pi pi-fw pi-user',
                        to: '/admin/restaurants'
                    },
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-user',
                        to: '/admin/users'
                    },
                ]
            },
        ] : []),
        ...(userType === 'chef' ? [
            {
                label: 'Chef',
                items: [
                    {
                        label: 'View Current Orders',
                        icon: 'pi pi-fw pi-shopping-cart',
                        to: '/pages/view-orders'
                    },
                    {
                        label: 'View Menu',
                        icon: 'pi pi-fw pi-book',
                        to: '/pages/view-menu'
                    },
                ]
            },
        ] : []),
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {menuItems.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;