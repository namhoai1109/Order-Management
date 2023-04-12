import React from 'react';
import Logo from '~/assets/images/logo.png';
import classNames from 'classnames/bind';
import styles from './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'antd';

const CX = classNames.bind(styles);

const handleLogout = () => {
    toast.success("Logout successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/"
    }, 1200);

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
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
            </div>

        </div>
    )

};

export default HeaderLayout;