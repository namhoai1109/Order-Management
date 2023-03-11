import { Outlet } from '@umijs/max';
import { Layout } from 'antd';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const BasicLayout: React.FC = () => {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Layout>
  );
};

export default BasicLayout;
