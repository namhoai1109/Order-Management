import { MoreOutlined } from '@ant-design/icons';
import { Skeleton, Tooltip, Typography } from 'antd';
import colors from '../../../config/colors';
import './DishCard.less';
import useDishCard from './useDishCard';

interface IDishCardProps {
  status: string;
  src: string;
  name: string;
  price: number;
  description: string;
}

const DishCard: React.FC<IDishCardProps> = ({ status, src, name, price, description }) => {
  const { showDescription, clickToShowDescription } = useDishCard();
  return (
    <div className="wrap-dish-card">
      <div className="wrap-status">
        <span className="status-dish">{status}</span>
        <Tooltip
          color={colors['primary-color']}
          title={<span className="details-btn">details</span>}
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
      <div className="filter-image"></div>
      <div className="wrap-info-dish">
        <div onClick={clickToShowDescription} className="wrap-head-info-dish glassmorphism">
          <Typography.Paragraph ellipsis={{ rows: 1, symbol: '...' }} className="title-dish-card">
            {name}
          </Typography.Paragraph>
          <span className="price-dish">{`${price} VND`}</span>
        </div>
        <div
          onClick={clickToShowDescription}
          className={`wrap-desc glassmorphism ${showDescription ? 'show' : null}`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default DishCard;
