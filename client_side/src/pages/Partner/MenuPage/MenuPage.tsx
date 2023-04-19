import DishCard from '@/components/DishCard/DishCard';
import { componentMode } from '@/constants/component_mode';
import { componentStatus } from '@/constants/component_status';
import dimensions from '@/constants/dimensions';
import { internalLink } from '@/constants/internal_link';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Col, Empty, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import './MenuPage.less';
import useMenuPage from './useMenuPage';

const constants = {
  TITLE_ADD_MENU_BTN: 'new menu',
};

const renderUI = (dishes: OBJECT_TYPE.TDish[], isLoading: boolean) => {
  if (!isLoading && dishes.length === 0) {
    return (
      <Row justify={componentMode.CENTER}>
        <Empty description={componentStatus.MESSAGE_TROUBLE} />
      </Row>
    );
  }

  return (
    <Row gutter={[dimensions.GUTTER_16, dimensions.GUTTER_16]}>
      {dishes.map((dish) => {
        return (
          <Col key={dish.id} span={dimensions.SPAN_4}>
            <DishCard {...dish} />
          </Col>
        );
      })}
    </Row>
  );
};

const MenuPage: React.FC = () => {
  const { dishes, isLoading } = useMenuPage();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="wrap-menu-page">
      <header className="header-page flex-center">
        <span className="partner-name">Partner Name</span>
        <a href={internalLink.NEW_DISH}>
          <Typography.Paragraph className="add-menu-btn">
            {constants.TITLE_ADD_MENU_BTN}
            <PlusCircleOutlined className="icon" />
          </Typography.Paragraph>
        </a>
      </header>
      {renderUI(dishes, isLoading)}
    </div>
  );
};

export default MenuPage;
