import { componentMode } from '@/constants/component_mode';
import { orderProcess, orderStatus } from '@/constants/constants_order';
import dimensions from '@/constants/dimensions';
import { typography } from '@/constants/typography';
import { Button, Col, Row, Typography } from 'antd';
import OrderDetailModal from './components/OrderDetailModal/OrderDetailModal';
import './OrderItem.less';
import useOrderItem from './useOrderItem';

interface IOrderItemProps {
  canChoose?: boolean;
  canConfirm?: boolean;
  canSelect?: boolean;
  customerView?: boolean;
  orderInfo: OBJECT_TYPE.TOrder;
}

const formatTime = (time: string) => {
  if (time === null) return '';

  const date = new Date(time);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const renderWebField = (orderInfo: OBJECT_TYPE.TOrder) => (
  <Row justify={componentMode.CENTER} className="wrap-info-field">
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.orderCode}
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.customer.name}
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      <Typography.Paragraph
        ellipsis={{
          rows: typography.MAX_ROW_1,
          symbol: typography.OVERFLOW_SYMBOL,
          tooltip: orderInfo.customer.address,
        }}
        className="customer-address"
      >
        {orderInfo.customer.address}
      </Typography.Paragraph>
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.orderPrice} VND
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.shipper !== null ? (
        orderInfo.shipper.name
      ) : (
        <span className="green">finding...</span>
      )}
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.process}
    </Col>
  </Row>
);

const renderCustomerField = (orderInfo: OBJECT_TYPE.TOrder) => (
  <Row justify={componentMode.CENTER} className="wrap-info-field">
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {formatTime(orderInfo.deliveredAt)}
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.branch.partner.brandName}
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      <Typography.Paragraph
        ellipsis={{
          rows: typography.MAX_ROW_1,
          symbol: typography.OVERFLOW_SYMBOL,
          tooltip: orderInfo.customer.address,
        }}
        className="customer-address"
      >
        {`${orderInfo.branch.address}, ${orderInfo.branch.district.name}`}
      </Typography.Paragraph>
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.orderPrice} VND
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.shippingPrice} VND
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_4}>
      {orderInfo.process}
    </Col>
  </Row>
);

const renderMobileField = (orderInfo: OBJECT_TYPE.TOrder) => (
  <Row justify={componentMode.CENTER} className="wrap-info-field">
    <Col className="flex-center" span={dimensions.SPAN_14}>
      <Typography.Paragraph
        ellipsis={{
          rows: typography.MAX_ROW_1,
          symbol: typography.OVERFLOW_SYMBOL,
        }}
        className="customer-address"
      >
        {orderInfo.customer.address}
      </Typography.Paragraph>
    </Col>
    <Col className="flex-center" span={dimensions.SPAN_10}>
      {orderInfo.orderPrice} VND
    </Col>
  </Row>
);

function OrderItem({ canChoose, canConfirm, canSelect, orderInfo, customerView }: IOrderItemProps) {
  const {
    isMobile,
    toggleModal,
    handleToggleModal,
    isLoadingPartner,
    isLoadingShipper,
    handleConfirmTakeOrder,
    handleConfirmDeliverOrder,
    handleConfirmOrder,
    handleConfirmDeliverOrderShipper,
  } = useOrderItem(orderInfo.orderCode);

  const renderButtonConfirm = (isConfirmed: boolean) => {
    if (isConfirmed) {
      return <span className="green">Confirmed</span>;
    }

    return (
      <Button
        loading={isLoadingPartner}
        className="choose-button"
        onClick={(event) => {
          event.stopPropagation();
          handleConfirmOrder();
        }}
      >
        Confirm
      </Button>
    );
  };

  const renderButtonDeliver = (process: string) => {
    if (process === orderProcess.DELIVERING) {
      return <span className="green-light">Delivering</span>;
    }

    if (process === orderProcess.DELIVERED) {
      return <span className="green">Delivered</span>;
    }

    return (
      <Button
        loading={isLoadingShipper}
        className="choose-button"
        onClick={(event) => {
          event.stopPropagation();
          handleConfirmDeliverOrder();
        }}
      >
        Deliver
      </Button>
    );
  };

  const renderListOrder = () => {
    if (isMobile) {
      return renderMobileField(orderInfo);
    }

    if (customerView) {
      return renderCustomerField(orderInfo);
    }

    return renderWebField(orderInfo);
  };

  const leftSizeComp = isMobile ? dimensions.SPAN_18 : dimensions.SPAN_20;
  const rightSizeComp = isMobile ? dimensions.SPAN_6 : dimensions.SPAN_4;

  const isChoose = canChoose && !canConfirm && !canSelect;
  const isSelect = canSelect && !canChoose && !canConfirm;
  const isConfirm = canConfirm && !canChoose && !canSelect;

  return (
    <Row
      className={`wrap-order-item ${isMobile ? 'no-hover' : ''}`}
      justify={componentMode.CENTER}
      onClick={handleToggleModal}
    >
      <Col span={leftSizeComp}>{renderListOrder()}</Col>
      {isChoose && (
        <Col span={dimensions.SPAN_4} className="flex-center">
          <Button
            loading={isLoadingShipper}
            onClick={(event) => {
              event.stopPropagation();
              handleConfirmTakeOrder();
            }}
            className="choose-button"
          >
            Choose
          </Button>
        </Col>
      )}
      {isConfirm && (
        <Col span={rightSizeComp} className="flex-center">
          {renderButtonConfirm(orderInfo.status === orderStatus.CONFIRMED)}
        </Col>
      )}
      {isSelect && (
        <Col span={rightSizeComp} className="flex-center">
          {renderButtonDeliver(orderInfo.process)}
        </Col>
      )}
      <OrderDetailModal
        orderCode={orderInfo.orderCode}
        customerInfo={orderInfo.customer}
        open={toggleModal}
        orderDetails={orderInfo.orderDetails}
        isMobile={isMobile}
        processOrder={orderInfo.process}
        confirmDelivered={handleConfirmDeliverOrderShipper}
        customerView={customerView}
      />
    </Row>
  );
}

OrderItem.defaultProps = {
  canChoose: false,
  canConfirm: false,
  canSelect: false,
  customerView: false,
};

export default OrderItem;
