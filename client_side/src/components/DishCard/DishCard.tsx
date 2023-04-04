import { constantsTypography } from '@/constants/constants_typography';
import { getImageLink } from '@/utils/image';
import { MoreOutlined } from '@ant-design/icons';
import { Skeleton, Tooltip, Typography } from 'antd';
import colors from '../../../config/colors';
import DetailDishModal from './components/DetailDishModal/DetailDishModal';
import './DishCard.less';
import useDishCard from './useDishCard';

const constants = {
  TITLE_DETAIL_BTN: 'details',
};

const DishCard: React.FC<OBJECT_TYPE.TDish> = ({
  status,
  name,
  images,
  description,
  dishDetails,
}) => {
  const {
    showDescription,
    clickToShowDescription,
    openModal,
    openTooltip,
    toggleTooltip,
    toggleModal,
  } = useDishCard();
  return (
    <div className="wrap-dish-card">
      <div className="wrap-status">
        {status ? <span className="status-dish">{status}</span> : <span />}
        <Tooltip
          color={colors['primary-color']}
          trigger="click"
          open={openTooltip}
          title={
            <span onClick={toggleModal} className="details-btn-in-dish-card">
              {constants.TITLE_DETAIL_BTN}
            </span>
          }
          placement="bottomRight"
        >
          <span className="more-btn" onClick={toggleTooltip}>
            <MoreOutlined />
          </span>
        </Tooltip>
      </div>
      {images.length > 0 ? (
        <img src={getImageLink(images[0].filename)} alt="image" className="image-dish-card" />
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
        {description && (
          <div
            onClick={clickToShowDescription}
            className={`wrap-desc glassmorphism ${showDescription ? 'show' : ''}`}
          >
            {description}
          </div>
        )}
      </div>
      <DetailDishModal
        openModal={openModal}
        onCancel={toggleModal}
        images={images}
        name={name}
        dishDetails={dishDetails}
        description={description}
      />
    </div>
  );
};

export default DishCard;
