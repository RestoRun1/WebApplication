/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { useRouter } from 'next/router';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { logout } from '../app/(main)/utilities/logout_func';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    /*const router = useRouter();
    const isLoginPage = router.pathname === '/pages/login';*/

    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);

    // useImperativeHandle is used to expose the internal refs to parent components
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
    }));

    /*// Only render the top bar if not on the login page
    if (isLoginPage) {
        return null;
    }
*/
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
            {/*after logo -${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg */}
                <img src={`/layout/images/logo.png`} width="47.22px" height={'35px'} alt="logo" />
                <span>RestoRun</span>
            </Link>

            {/*{!isLoginPage && (*/}
              <>
                <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                  <i className="pi pi-bars" />
                </button>

                <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                  <i className="pi pi-ellipsis-v" />
                </button>

                <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                  <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                  </button>
                  <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                  </button>
                    <Link href="/documentation" passHref>
                        <button type="button" className="p-link layout-topbar-button">
                            <i className="pi pi-cog"></i>
                            <span>Settings</span>
                        </button>
                    </Link>
                    <div className="layout-topbar-right-actions">
                        <button onClick={logout} className="logout-button">Log Out</button>
                    </div>
                </div>
              </>
            {/*)}*/}
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
