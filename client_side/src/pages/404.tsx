import { componentType } from '@/constants/component_type';
import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type={componentType.PRIMARY} onClick={() => history.back()}>
        Back
      </Button>
    }
  />
);

export default NoFoundPage;
