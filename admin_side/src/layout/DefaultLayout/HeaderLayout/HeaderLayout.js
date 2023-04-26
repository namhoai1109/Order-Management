import React from 'react';
import Logo from '~/assets/images/logo.png';
import classNames from 'classnames/bind';
import styles from './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'antd';

const CX = classNames.bind(styles);

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"
};

function HeaderLayout() {
    return (
        <div className={CX("header_container")}>
            <div className={CX("header_logo")}>
                <img src={Logo} alt="logo" />
            </div>
            <div className={CX("header_right")}>
                <div className={CX("header_right_item")}>
                    <Button onClick={handleLogout} className={CX("btn_logout")} >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Button>
                </div>
            </div>

        </div>
    )

};

export default HeaderLayout;