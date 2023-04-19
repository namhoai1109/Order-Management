import { componentMode } from '@/constants/component_mode';
import { componentType } from '@/constants/component_type';
import dimensions from '@/constants/dimensions';
import { getImageLink } from '@/utils/image';
import { Button, Carousel, Col, Modal, Popconfirm, Row, Skeleton } from 'antd';
import OptionDishItem from '../OptionDishItem/OptionDishItem';
import './DetailDishModal.less';

interface IDetailDishModalProps {
  openModal: boolean;
  idDish: number;
  onCancel: () => void;
  name: string;
  description: string;
  images: OBJECT_TYPE.TImageDish[];
  dishDetails: OBJECT_TYPE.TDishDetails[];
  canDelete: boolean;
}

const DetailDishModal: React.FC<IDetailDishModalProps> = ({
  openModal,
  onCancel,
  name,
  description,
  images,
  dishDetails,
  canDelete,
}) => {
  return (
    <Modal
      centered
      width={dimensions.WIDTH_MODAL_600}
      open={openModal}
      onCancel={onCancel}
      footer={null}
    >
      <Row
        gutter={dimensions.GUTTER_16}
        justify={componentMode.CENTER}
        className="wrap-detail-dish-modal flex-center"
      >
        <Col span={dimensions.SPAN_10} className="wrap-info flex-center">
          {images.length > 0 ? (
            <Carousel dotPosition={'top'} className="carousel-images" autoplay>
              {images.map((image) => {
                const linkImg = getImageLink(image.filename);
                return <img className="image-dish-card" key={image.id} src={linkImg} />;
              })}
            </Carousel>
          ) : (
            <Skeleton.Image className="image-dish-card" />
          )}
          <div className="wrap-content">
            <div className="content glassmorphism">{name}</div>
            {description && <div className="content glassmorphism ">{description}</div>}
          </div>
        </Col>
        <Col span={dimensions.SPAN_14} className="wrap-option-field">
          <div className="header-field flex-center">
            <span className="header-title">Option</span>
            <span className="header-title">Price</span>
          </div>
          <div className="wrap-option-item">
            {dishDetails.map((option) => {
              return (
                <OptionDishItem
                  key={option.id}
                  optionName={option.name}
                  optionPrice={option.price.toString()}
                />
              );
            })}
          </div>
        </Col>
        {canDelete && (
          <div className="flex-center wrap-buttons">
            <Popconfirm title="Sure to delete?">
              <Button type={componentType.PRIMARY} className="delete-btn">
                Delete
              </Button>
            </Popconfirm>
          </div>
        )}
      </Row>
    </Modal>
  );
};

export default DetailDishModal;
