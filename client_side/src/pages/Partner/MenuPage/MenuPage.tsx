import DishCard from '@/components/DishCard/DishCard';
import dimensions from '@/constants/dimensions';
import { internalLink } from '@/constants/internal_link';
import { getImageLink } from '@/utils/image';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import './MenuPage.less';
import useMenuPage from './useMenuPage';

const constants = {
  TITLE_ADD_MENU_BTN: 'new menu',
};

const MenuPage: React.FC = () => {
  const { dishes } = useMenuPage();
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
      <Row gutter={[dimensions.GUTTER_16, dimensions.GUTTER_16]}>
        {dishes.map((dish) => {
          return (
            <Col key={dish.id} span={dimensions.SPAN_4}>
              <DishCard
              {...dish}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default MenuPage;
