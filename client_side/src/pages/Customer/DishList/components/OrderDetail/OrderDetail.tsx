import dimensions from '@/constants/dimensions';
import { typography } from '@/constants/typography';
import { Col, Row, Typography } from 'antd';
import './OrderDetail.less';

interface IOrderDetailProps {
  orderDetail: TOrderDetail;
}

function OrderDetail({ orderDetail }: IOrderDetailProps) {
  return (
    <div className="wrap-order-detail-item">
      {orderDetail.details.map((selectedDetail) => {
        return (
          <Row key={selectedDetail.details.id} gutter={dimensions.GUTTER_16}>
            <Col span={dimensions.SPAN_10} className="flex-center">
              <Typography.Paragraph
                ellipsis={{
                  rows: typography.MAX_ROW_1,
                  symbol: typography.OVERFLOW_SYMBOL,
                  tooltip: selectedDetail.details.name,
                }}
                className="detail-item-name"
              >
                {orderDetail.dishName}
              </Typography.Paragraph>
            </Col>
            <Col span={dimensions.SPAN_10} className="flex-center">
              <Typography.Paragraph
                ellipsis={{
                  rows: typography.MAX_ROW_1,
                  symbol: typography.OVERFLOW_SYMBOL,
                  tooltip: selectedDetail.details.name,
                }}
                className="detail-item-name"
              >
                {selectedDetail.details.name}
              </Typography.Paragraph>
            </Col>
            <Col className="flex-center" span={dimensions.SPAN_4}>
              x{selectedDetail.quantity}
            </Col>
          </Row>
        );
      })}
    </div>
  );
}

export default OrderDetail;
