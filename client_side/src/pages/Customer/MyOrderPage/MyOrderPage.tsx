import OrderItem from '@/components/OrderItem/OrderItem';
import { componentMode } from '@/constants/component_mode';
import dimensions from '@/constants/dimensions';
import { Col, Empty, Row, Skeleton } from 'antd';
import './MyOrderPage.less';
import useMyOrderPage from './useMyOrderPage';

const renderTitle = () => (
  <Row justify={componentMode.CENTER} className="wrap-info-field">
    <Col className="flex-center title" span={dimensions.SPAN_4}>
      Deliver Time
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_4}>
      Brand name
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_4}>
      Brand address
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_4}>
      Order price
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_4}>
      Shipping price
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_4}>
      Process
    </Col>
  </Row>
);

function MyOrderPage() {
  const { orders, isLoading } = useMyOrderPage();

  if (isLoading) {
    return <Skeleton />;
  }

  if (orders && orders.length === 0) {
    return <Empty />;
  }

  return (
    <div className="wrap-my-order-page-customer">
      <Row className="wrap-title" justify={componentMode.CENTER}>
        <Col span={dimensions.SPAN_20}>{renderTitle()}</Col>
      </Row>
      {orders.map((order) => {
        return <OrderItem key={order.id} orderInfo={order} customerView />;
      })}
    </div>
  );
}

export default MyOrderPage;
