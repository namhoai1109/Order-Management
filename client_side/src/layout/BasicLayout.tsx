import dimensions from '@/constants/dimensions';
import { Outlet } from '@umijs/max';
import { Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styles from './BasicLayout.less';
import useBasicLayout from './useBasicLayout';

const queryClient = new QueryClient();

const BasicLayout: React.FC = () => {
  const { list, selectedKey, onClickMenuItem } = useBasicLayout();
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Row className={styles['wrap-nav-bar-layout']} justify="center">
          <Col flex={dimensions.MAX_WIDTH_NAVBAR}>
            <Menu
              defaultSelectedKeys={[selectedKey]}
              mode="horizontal"
              onClick={onClickMenuItem}
              items={list}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col flex={dimensions.MAX_WIDTH}>
            <Outlet />
          </Col>
        </Row>
      </QueryClientProvider>
    </Layout>
  );
};

export default BasicLayout;
