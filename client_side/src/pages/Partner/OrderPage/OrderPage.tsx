import OrderItem from '@/components/OrderItem/OrderItem';
import { componentMode } from '@/constants/component_mode';
import dimensions from '@/constants/dimensions';
import { Col, Empty, Row, Skeleton } from 'antd';
import './OrderPage.less';
import useOrderPage from './useOrderPage';

const renderTitle = () => {
  return (
    <Row justify={componentMode.CENTER}>
      <Col className="flex-center title" span={dimensions.SPAN_4}>
        ID order
      </Col>
      <Col className="flex-center title" span={dimensions.SPAN_4}>
        Client name
      </Col>
      <Col className="flex-center title" span={dimensions.SPAN_4}>
        Address
      </Col>
      <Col className="flex-center title" span={dimensions.SPAN_4}>
        Order Price
      </Col>
      <Col className="flex-center title" span={dimensions.SPAN_4}>
        Shipper name
      </Col>
      <Col className="flex-center title" span={dimensions.SPAN_4}>
        Process
      </Col>
    </Row>
  );
};

function OrderPage() {
  const { orders, isLoading } = useOrderPage();

  if (isLoading) {
    return <Skeleton />;
  }

  if (!isLoading && orders !== undefined && orders.length === 0) {
    return (
      <Row justify={componentMode.CENTER}>
        <Empty />
      </Row>
    );
  }

  return (
    <div className="wrap-order-page">
      <header className="header-page flex-center">
        <span className="partner-name">Order Today !</span>
      </header>
      <div className="wrap-order-list">
        <Row justify={componentMode.CENTER} className="header-list">
          <Col span={dimensions.SPAN_20}>{renderTitle()}</Col>
          <Col span={dimensions.SPAN_4} className="flex-center title">
            Confirm order
          </Col>
        </Row>
        <div className="order-list">
          {orders?.map((order) => {
            return <OrderItem key={order.id} orderInfo={order} canConfirm />;
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
