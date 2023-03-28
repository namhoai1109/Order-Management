import { constantsTypography } from '@/constants/constants_typography';
import { MoreOutlined } from '@ant-design/icons';
import { Skeleton, Tooltip, Typography } from 'antd';
import colors from '../../../config/colors';
import DetailDishModal from './components/DetailDishModal';
import './DishCard.less';
import useDishCard from './useDishCard';

interface IDishCardProps {
  status: string;
  src: string;
  name: string;
  description: string;
}

const constants = {
  TITLE_DETAIL_BTN: 'details',
};

const DishCard: React.FC<IDishCardProps> = ({ status, src, name, description }) => {
  const { showDescription, clickToShowDescription, openModal, toggleModal } = useDishCard();
  return (
    <div className="wrap-dish-card">
      <div className="wrap-status">
        <span className="status-dish">{status}</span>
        <Tooltip
          color={colors['primary-color']}
          title={
            <span onClick={toggleModal} className="details-btn-in-dish-card">
              {constants.TITLE_DETAIL_BTN}
            </span>
          }
          placement="bottomRight"
        >
          <span className="more-btn">
            <MoreOutlined />
          </span>
        </Tooltip>
      </div>
      {src ? (
        <img src={src} alt="image" className="image-dish-card" />
      ) : (
        <Skeleton.Image className="image-dish-card" />
      )}
      <div className="filter-image" />
      <div className="wrap-info-dish">
        <div onClick={clickToShowDescription} className="wrap-head-info-dish glassmorphism">
          <Typography.Paragraph
            ellipsis={{
              rows: constantsTypography.MAX_ROW_1,
              symbol: constantsTypography.SYMBOL,
              tooltip: name,
            }}
            className="title-dish-card"
          >
            {name}
          </Typography.Paragraph>
        </div>
        <div
          onClick={clickToShowDescription}
          className={`wrap-desc glassmorphism ${showDescription && 'show'}`}
        >
          {description}
        </div>
      </div>
      <DetailDishModal
        openModal={openModal}
        onCancel={toggleModal}
        src={src}
        name={name}
        description={description}
      />
    </div>
  );
};

export default DishCard;
