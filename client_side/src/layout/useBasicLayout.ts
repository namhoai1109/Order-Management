import { useLocation, useNavigate } from '@umijs/max';
import { MenuItemProps, MenuProps } from 'antd';
import { useEffect, useState } from 'react';

const navbarPartner: IMenu = {
  list: [
    {
      key: 'menu',
      label: 'Menu',
    },
    {
      key: 'order',
      label: 'Order',
    },
    {
      key: 'analyst',
      label: 'Analyst',
    },
  ],
  prevPath: '/partner',
};

interface IMenuItem {
  key: string;
  label: string;
}

interface IMenu {
  list: IMenuItem[];
  prevPath: string;
}

const useBasicLayout = () => {
  const [selectedKey, setSelectedKey] = useState(navbarPartner.list[0]?.key);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const path = location.pathname;
    //find menu item that has key included in path
    const selectedItem = navbarPartner.list.find((item: IMenuItem) => path.includes(item.key));
    setSelectedKey(selectedItem?.key || '');
  }, [location.pathname]);

  const onClickMenuItem: MenuProps['onClick'] = (navItem) => {
    navigate(`${navbarPartner.prevPath}/${navItem.key}`);
  };
  return { list: navbarPartner.list, selectedKey, onClickMenuItem };
};

export default useBasicLayout;
