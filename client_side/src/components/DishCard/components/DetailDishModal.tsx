import { Modal } from 'antd';
import './DetailDishModal.less';

interface IDetailDishModalProps {
  openModal: boolean;
  onCancel: () => void;
  src: string;
  name: string;
  description: string;
}

const WIDTH_MODAL = '800px';

const DetailDishModal: React.FC<IDetailDishModalProps> = ({
  openModal,
  onCancel,
  src,
  name,
  description,
}) => {
  return (
    <Modal width={WIDTH_MODAL} open={openModal} onCancel={onCancel} footer={null}>
      <div className="wrap-detail-dish-modal">
        <div className="wrap-info flex-center">
          <img src={src} alt="dish-image" className="dish-img" />
          <div className="wrap-content">
            <div className="content glassmorphism">{name}</div>
            <div className="content glassmorphism ">{description}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailDishModal;
