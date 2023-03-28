import { history, useLocation } from '@umijs/max';
import { MenuProps } from 'antd';
import {
  defaultNavItem,
  navbarPartner,
  navbarShipper,
  navbarCustomer,
} from '../constants/constants_navbars';
import { roles } from '@/constants/roles';
import { internalLink } from '@/constants/internal_link';
import { keyLocalStorage, removeKey } from '@/utils/local_storage';

const getNavbar = (pathRole: string) => {
  switch (pathRole) {
    case roles.PARTNER:
      return navbarPartner;
    case roles.SHIPPER:
      return navbarShipper;
    case roles.CUSTOMER:
      return navbarCustomer;
    default:
      return navbarPartner;
  }
};

const checkPathRole = (pathRole: string) => {
  switch (pathRole) {
    case roles.PARTNER:
      return true;
    case roles.SHIPPER:
      return true;
    case roles.CUSTOMER:
      return true;
    default:
      return false;
  }
};

const getRole = (pathRole: string) => {
  switch (pathRole) {
    case roles.PARTNER:
      return roles.PARTNER;
    case roles.SHIPPER:
      return roles.SHIPPER;
    case roles.CUSTOMER:
      return roles.CUSTOMER;
    default:
      return roles.PARTNER;
  }
};

const getDefaultKey = (pathRole: string) => {
  switch (pathRole) {
    case roles.PARTNER:
      return defaultNavItem.PARTNER;
    case roles.SHIPPER:
      return defaultNavItem.SHIPPER;
    case roles.CUSTOMER:
      return defaultNavItem.CUSTOMER;
    default:
      return defaultNavItem.PARTNER;
  }
};

const getCurrentKey = (path: string, navBar: IMenu) => {
  const pathKey = path.split(internalLink.DIVIDER)[internalLink.KEY_NAVBAR_INDEX];
  const pathRole = path.split(internalLink.DIVIDER)[internalLink.ROLE_INDEX];
  const defaultKey = navBar.list.find((item) => item.key === pathKey);
  if (defaultKey) {
    return defaultKey.key;
  } else {
    return getDefaultKey(pathRole);
  }
};

const useBasicLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const pathRole = path.split(internalLink.DIVIDER)[internalLink.ROLE_INDEX];

  if (!checkPathRole(pathRole)) {
    history.push(internalLink.LOGIN);
  }

  const navBar = getNavbar(pathRole);
  const selectedKey = getCurrentKey(path, navBar);

  const onClickMenuItem: MenuProps['onClick'] = (navItem) => {
    history.push(`${navBar.prevPath}/${navItem.key}`);
  };

  const handleLogout = () => {
    removeKey(keyLocalStorage.TOKEN);
    removeKey(keyLocalStorage.USERNAME);
    removeKey(keyLocalStorage.ROLE);
    history.replace(internalLink.LOGIN);
  };

  return {
    list: navBar.list,
    role: getRole(pathRole),
    selectedKey,
    onClickMenuItem,
    handleLogout,
  };
};

export default useBasicLayout;
