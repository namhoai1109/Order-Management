import Logo from '~/assets/images/test.png';
import classNames from 'classnames/bind';
import styles from './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const CX = classNames.bind(styles);

function Header() {
    return (
        <div className={CX("header_container")}>
            <div className={CX("header_logo")}>
                <img src={Logo} alt="logo" />
            </div>
            <div className={CX("header_right")}>
                <div className={CX("header_right_item")}>
                    <FontAwesomeIcon icon={faRightFromBracket}  />
                </div>
            </div>

        </div>
    )

};

export default Header;