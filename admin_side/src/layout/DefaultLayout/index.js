import React from 'react';
import Header from './HeaderLayout/HeaderLayout';
import Sidebar from './SidebarLayout/SidebarLayout';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default DefaultLayout;