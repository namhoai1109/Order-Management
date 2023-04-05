import React from 'react';
import Header from './HeaderLayout';
import Sidebar from './SidebarLayout';

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