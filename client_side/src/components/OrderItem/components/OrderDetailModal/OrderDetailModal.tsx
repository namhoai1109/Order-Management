import { componentType } from '@/constants/component_type';
import { orderProcess } from '@/constants/constants_order';
import dimensions from '@/constants/dimensions';
import { typography } from '@/constants/typography';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { Fragment } from 'react';
import './OrderDetailModal.less';

interface TOrderDetailModalProps {
  open: boolean;
  orderDetails: OBJECT_TYPE.TOrderDetail[];
  orderCode: string;
  customerInfo: OBJECT_TYPE.TCustomer;
  isMobile: boolean;
  processOrder: string;
  confirmDelivered: TCallbackVoid;
  customerView?: boolean;
}

const renderTitle = () => (
  <Row className="wrap-title" gutter={dimensions.GUTTERS_16}>
    <Col className="flex-center title align-left" span={dimensions.SPAN_8}>
      Dish name
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_8}>
      Option name
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_2}>
      Quantity
    </Col>
    <Col className="flex-center title" span={dimensions.SPAN_6}>
      Price
    </Col>
  </Row>
);

const getTotalPrice = (orderDetails: OBJECT_TYPE.TOrderDetail[]) => {
  return orderDetails.reduce((totalPrice, orderDetail) => {
    return totalPrice + orderDetail.totalPrice;
  }, 0);
};

function OrderDetailModal({
  open,
  orderDetails,
  orderCode,
  customerInfo,
  isMobile,
  processOrder,
  confirmDelivered,
  customerView,
}: TOrderDetailModalProps) {
  return (
    <Modal
      className={`order-detail-modal ${isMobile ? 'mobile' : ''}`}
      width={dimensions.WIDTH_MODAL_600}
      centered
      open={open}
      closable={false}
      footer={null}
    >
      <header className="modal-header flex-center">
        <span className="modal-title">Order Detail !</span>
        <span>
          <span className="title-price">Total price: </span>
          <span>{getTotalPrice(orderDetails)} VND</span>
        </span>
      </header>
      {!customerView && (
        <Fragment>
          <div className="flex-center align-left mb">
            <span className="title mr">Order code: </span>
            <span>{orderCode}</span>
          </div>
          <div className="flex-center align-left mb">
            <span className="title mr">Client Name: </span>
            <span>{customerInfo.name}</span>
          </div>
          <div className="flex-center align-left mb">
            <span className="title mr">Address: </span>
            <span>{customerInfo.address}</span>
          </div>
          <div className="flex-center align-left mb">
            <span className="title mr">Phone number: </span>
            <span>{customerInfo.account.phone}</span>
          </div>
        </Fragment>
      )}
      {renderTitle()}
      {orderDetails.map((orderDetail) => {
        return (
          <Row className="order-detail-item" key={orderDetail.id} gutter={dimensions.GUTTERS_16}>
            <Col className="flex-center align-left" span={dimensions.SPAN_8}>
              <Typography.Paragraph
                className="mb-0"
                ellipsis={{
                  rows: typography.MAX_ROW_1,
                  symbol: typography.OVERFLOW_SYMBOL,
                  tooltip: orderDetail.dishName,
                }}
              >
                {orderDetail.dishName}
              </Typography.Paragraph>
            </Col>
            <Col className="flex-center" span={dimensions.SPAN_8}>
              {orderDetail.dishDetailName}
            </Col>
            <Col className="flex-center" span={dimensions.SPAN_2}>
              x{orderDetail.quantity}
            </Col>
            <Col className="flex-center" span={dimensions.SPAN_6}>
              {orderDetail.totalPrice}
            </Col>
          </Row>
        );
      })}
      {processOrder === orderProcess.DELIVERING && isMobile && (
        <Button
          className="delivered-button"
          onClick={(event) => {
            event.stopPropagation();
            confirmDelivered();
          }}
          type={componentType.PRIMARY}
        >
          Delivered
        </Button>
      )}
    </Modal>
  );
}

export default OrderDetailModal;
