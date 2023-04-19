import dimensions from '@/constants/dimensions';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, useModel } from '@umijs/max';
import { Card, Col, Dropdown, Menu, MenuProps, Row } from 'antd';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Auth from './Auth';
import './BasicLayout.less';
import useBasicLayout from './useBasicLayout';

const queryClient = new QueryClient();

const BasicLayout: React.FC = () => {
  const { list, selectedKey, onClickMenuItem, ...restProps } = useBasicLayout();
  const { initialState } = useModel('@@initialState');
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <span onClick={restProps.handleLogout} className="menu-item-basic-layout">
          Log out
        </span>
      ),
    },
  ];
  return (
    <div className="wrap-nav-bar-layout">
      <QueryClientProvider client={queryClient}>
        <Auth role={restProps.role}>
          <Row justify="center" className="wrap-content-navbar">
            <Col className="flex-center navbar" flex={dimensions.MAX_WIDTH_NAVBAR}>
              <Menu
                defaultSelectedKeys={[selectedKey]}
                mode="horizontal"
                onClick={onClickMenuItem}
                items={list}
              />
              <Dropdown trigger={['click']} menu={{ items }}>
                <span className="flex-center wrap-header-account">
                  {initialState?.currentUser.username}
                  <DownOutlined className="icon" />
                </span>
              </Dropdown>
            </Col>
          </Row>
          <Row justify="center">
            <Col flex={dimensions.MAX_WIDTH}>
              <div className="wrap-content">
                <Card>
                  <Outlet />
                </Card>
              </div>
            </Col>
          </Row>
        </Auth>
      </QueryClientProvider>
    </div>
  );
};

export default BasicLayout;
