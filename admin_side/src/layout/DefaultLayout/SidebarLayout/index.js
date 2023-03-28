import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faPeopleRoof, faUsers, faMotorcycle, faHandshake, faBars, faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


function SidebarLayout() {
    const [arrow, setArrow] = useState(faCircleLeft);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
        setArrow(isOpen ? faCircleLeft : faCircleRight)
    }



    // add class active to class sidebar_container when click on button. use ref to get element
    const sidebarContainer = useRef(null);
    useEffect(() => {
        const sidebar = sidebarContainer.current;
        if (isOpen) {
            sidebar.classList.add('inactive');
        } else {
            sidebar.classList.remove('inactive');
        }
    }, [isOpen]);

    

    return (
        <div ref={sidebarContainer} className="sidebar_container">
            <div className="sidebar_tilte">
                <h1>Admin</h1>
                <button onClick={toggle} className="sidebar_btnbars"><FontAwesomeIcon className="btn_arrow" icon={arrow} />
                </button>
            </div>
            <Sidebar>
                <Menu>
                    <MenuItem icon={<FontAwesomeIcon icon={faPeopleRoof} />} component={<Link to="/admin/adminStaff" />}> Staff </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faUsers} />} component={<Link to="/admin/adminUser" />}> User </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faMotorcycle} />} component={<Link to="/admin/adminShipper" />}> Shipper </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faHandshake} />} component={<Link to="/admin/adminPartner" />}> Partner </MenuItem>

                </Menu>
            </Sidebar>
        </div>
    )

};

export default SidebarLayout;

// useEffect(() => {
//     const sidebar = document.querySelector('.sidebar_container');
//     if (isOpen) {
//         sidebar.classList.add('inactive');
//     } else {
//         sidebar.classList.remove('inactive');

//     }
// }, [isOpen]);