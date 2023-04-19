import dimensions from '@/constants/dimensions';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import OrderDetail from '../OrderDetail/OrderDetail';
import './CreateOrder.less';
import useCreateOrder from './useCreateOrder';

const renderTitle = () => (
  <Row className="wrap-title">
    <Col span={dimensions.SPAN_10}>
      <span className="title">Dish Name</span>
    </Col>
    <Col span={dimensions.SPAN_10}>
      <span className="title">Option</span>
    </Col>
    <Col span={dimensions.SPAN_4}>
      <span className="title">Option</span>
    </Col>
  </Row>
);

interface ICreateOrderProps {
  orderDetailList: TOrderDetail[];
  branchId: number;
  removeOrderDetail: (key: number) => void;
  clearOrderDetail: TCallbackVoid;
}

function CreateOrder({
  orderDetailList,
  removeOrderDetail,
  branchId,
  clearOrderDetail,
}: ICreateOrderProps) {
  const { isLoading, handleSubmit, renderTotal } = useCreateOrder(
    orderDetailList,
    branchId,
    clearOrderDetail,
  );

  const renderUI = () => {
    return orderDetailList.map((orderDetail) => {
      return (
        <div key={orderDetail.key} className="flex-center wrap-item">
          <OrderDetail orderDetail={orderDetail} />
          <Button
            className="delete-btn"
            danger
            onClick={() => {
              removeOrderDetail(orderDetail.key);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      );
    });
  };

  return (
    <div className="wrap-create-order">
      <div className="wrap-order-detail">
        {renderTitle()} {renderUI()}
      </div>
      <div className="flex-center price-field">
        <span className="label">Shipping fee:</span>
        <span>25000 VND</span>
      </div>
      <div className="flex-center price-field">
        <span className="label">Fee:</span>
        <span>{renderTotal()} VND</span>
      </div>
      <div className="flex-center price-field">
        <span className="label">Total:</span>
        <span>{renderTotal() + 25000} VND</span>
      </div>
      <Form.Item className="wrap-order-btn">
        <Button className="order-btn" loading={isLoading} htmlType="submit" onClick={handleSubmit}>
          Order
        </Button>
      </Form.Item>
    </div>
  );
}

export default CreateOrder;
