import { componentType } from '@/constants/component_type';
import dimensions from '@/constants/dimensions';
import { typography } from '@/constants/typography';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Popconfirm, Row, Typography } from 'antd';
import './ModalAddDish.less';
import useModalAddDish from './useModalAddDish';

interface IModalAddDishProps {
  open: boolean;
  onCancel: () => void;
  dish: OBJECT_TYPE.TDish;
  addOrderDetail: (selectedDetail: TOrderDetail) => void;
}

const renderTitle = () => {
  return (
    <Row gutter={dimensions.GUTTER_16}>
      <Col className="flex-center title" span={dimensions.SPAN_12}>
        Option
      </Col>
      <Col className="flex-center title" span={dimensions.SPAN_10}>
        Price
      </Col>
    </Row>
  );
};

const renderOptionDetail = (
  dishDetail: OBJECT_TYPE.TDishDetails[],
  addDetail: (detail: OBJECT_TYPE.TDishDetails) => void,
) => {
  return dishDetail.map((detail: OBJECT_TYPE.TDishDetails) => {
    return (
      <Row gutter={dimensions.GUTTER_16} key={detail.id} className="option-detail">
        <Col className="flex-center align-left" span={dimensions.SPAN_12}>
          <Typography.Paragraph
            ellipsis={{
              rows: typography.MAX_ROW_1,
              symbol: typography.OVERFLOW_SYMBOL,
              tooltip: detail.name,
            }}
            className="mb-0"
          >
            {detail.name}
          </Typography.Paragraph>
        </Col>
        <Col className="flex-center" span={dimensions.SPAN_10}>
          {detail.price} VND
        </Col>
        <Col className="flex-center" span={dimensions.SPAN_2}>
          <Button
            className="detail-btn"
            onClick={() => {
              addDetail(detail);
            }}
          >
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
    );
  });
};

const renderSelectedDetail = (
  selectedDetail: TSelectedDetail[],
  deleteDetail: (detail: TSelectedDetail) => void,
) => {
  return selectedDetail.map((selectedDetail: TSelectedDetail) => {
    return (
      <Row key={selectedDetail.details.id} className="selected-detail">
        <Col className="flex-center align-left" span={dimensions.SPAN_16}>
          <Typography.Paragraph
            ellipsis={{
              rows: typography.MAX_ROW_1,
              symbol: typography.OVERFLOW_SYMBOL,
              tooltip: selectedDetail.details.name,
            }}
            className="mb-0"
          >
            {selectedDetail.details.name}
          </Typography.Paragraph>
        </Col>
        <Col className="flex-center" span={dimensions.SPAN_4}>{`x${selectedDetail.quantity}`}</Col>
        <Col className="flex-center" span={dimensions.SPAN_4}>
          <Button
            danger
            className="detail-btn"
            onClick={() => {
              deleteDetail(selectedDetail);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
    );
  });
};

function ModalAddDish({ open, dish, onCancel, addOrderDetail }: IModalAddDishProps) {
  const { totalPrice, selectedDetail, addDetail, deleteDetail, cancelModal, handleAddOrderDetail } =
    useModalAddDish(dish.id, dish.name, onCancel, addOrderDetail);
  return (
    <Modal
      width={dimensions.WIDTH_MODAL_800}
      className="wrap-modal-add-dish"
      open={open}
      footer={null}
      closable={false}
      centered
    >
      <Row gutter={dimensions.GUTTERS_16}>
        <Col span={dimensions.SPAN_12} className="wrap-option-detail">
          {renderTitle()}
          <div className="wrap-option-detail-content">
            {renderOptionDetail(dish.dishDetails, addDetail)}
          </div>
          <div className="wrap-footer-buttons flex-center">
            <Popconfirm title="Sure to cancel?" onConfirm={cancelModal}>
              <Button className="button">Cancel</Button>
            </Popconfirm>
            <Button className="button" type={componentType.PRIMARY} onClick={handleAddOrderDetail}>
              Add
            </Button>
          </div>
        </Col>
        <Col span={dimensions.SPAN_12}>
          <span className="title flex-center">Your choice</span>
          <div className="wrap-selected-detail">
            <div className="wrap-content">{renderSelectedDetail(selectedDetail, deleteDetail)}</div>
            <div className="total-price flex-center">
              <span className="total-label">Total: </span>
              <span>{totalPrice} VND</span>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default ModalAddDish;
