import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import useToggle from './toggle';

import classNames from 'classnames/bind';
import styles from './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleRoof, faUsers, faMotorcycle, faHandshake } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


function SidebarLayout() {
    const { arrow, toggle, isOpen } = useToggle();
    const sidebarContainer = useRef(null);

    return (
        <div ref={sidebarContainer} className={cx('sidebar-container', { 'inactive': isOpen })}>
            <div className="sidebar_tilte">
                <h1>Admin</h1>
                <button onClick={toggle} className="sidebar_btnbars">
                    <FontAwesomeIcon className="btn_arrow" icon={arrow} />
                </button>
            </div>
            <Sidebar>
                <Menu>
                    <MenuItem icon={<FontAwesomeIcon icon={faPeopleRoof} />} component={<Link to="/admin/adminStaff" />}> Staff </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faUsers} />} component={<Link to="/admin/adminUser" />}> Customer </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faMotorcycle} />} component={<Link to="/admin/adminShipper" />}> Shipper </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faHandshake} />} component={<Link to="/admin/adminPartner" />}> Partner </MenuItem>

                </Menu>
            </Sidebar>
        </div>
    )
};

export default SidebarLayout;


