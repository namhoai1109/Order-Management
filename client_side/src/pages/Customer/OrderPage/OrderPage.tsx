import { assets } from '@/assets';
import { componentMode } from '@/constants/component_mode';
import { componentStatus } from '@/constants/component_status';
import dimensions from '@/constants/dimensions';
import { internalLink } from '@/constants/internal_link';
import { typography } from '@/constants/typography';
import { Col, Empty, Row, Skeleton, Typography } from 'antd';
import './OrderPage.less';
import useOrderPage from './useOrderPage';

const ShopItem = ({ id, brandName, culinaryStyle }: OBJECT_TYPE.TPartner) => {
  return (
    <a href={`${internalLink.CUSTOMER_ORDER}/${id}`} className="shop-item">
      <img src={assets.SHEF} alt="cooking-icon" className="shop-icon" />
      <Typography.Paragraph
        ellipsis={{
          rows: typography.MAX_ROW_1,
          symbol: typography.OVERFLOW_SYMBOL,
          tooltip: brandName,
        }}
        className="shop-title"
      >
        {brandName}
      </Typography.Paragraph>
      <span className="culinary-type">{culinaryStyle}</span>
    </a>
  );
};

const OrderPage: React.FC = () => {
  const { listPartner, isLoading } = useOrderPage();

  if (isLoading) {
    <Row justify={componentMode.CENTER}>
      <Skeleton />
    </Row>;
  }

  if (listPartner && listPartner.length === 0) {
    return (
      <Row justify={componentMode.CENTER}>
        <Empty description={componentStatus.MESSAGE_TROUBLE} />
      </Row>
    );
  }

  return (
    <div className="wrap-order-page">
      <Row gutter={dimensions.GUTTERS_16} justify={componentMode.START} className="wrap-shop-list">
        {listPartner &&
          listPartner.map((item) => {
            return (
              <Col key={item.id} span={dimensions.SPAN_4}>
                <ShopItem {...item} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default OrderPage;
