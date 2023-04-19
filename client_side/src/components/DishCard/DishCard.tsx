import { typography } from '@/constants/typography';
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

interface IDishCard extends OBJECT_TYPE.TDish {
  canDelete?: boolean;
}

function DishCard({ status, canDelete, name, images, description, dishDetails, id }: IDishCard) {
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
              rows: typography.MAX_ROW_1,
              symbol: typography.OVERFLOW_SYMBOL,
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
            <Typography.Paragraph
              className="mb-0 desc"
              ellipsis={{
                rows: typography.MAX_ROW_6,
                symbol: typography.OVERFLOW_SYMBOL,
                tooltip: description,
              }}
            >
              {description}
            </Typography.Paragraph>
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
        idDish={id}
        canDelete={canDelete as boolean}
      />
    </div>
  );
}

DishCard.defaultProps = {
  canDelete: true,
};

export default DishCard;
