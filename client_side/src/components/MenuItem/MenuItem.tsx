import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Typography } from 'antd';
import DishCard from '../DishCard/DishCard';
import './MenuItem.less';
import useMenuItem from './useMenuItem';

type typeMenuItem = {
  listDish: OBJECT_TYPE.typeDish[];
};

const MenuItem: React.FC<typeMenuItem> = ({ listDish }) => {
  const { sliderRef, showBtn, slideToLeft, slideToRight } = useMenuItem(listDish.length);

  return (
    <div className="wrap-menu-item">
      <Typography.Paragraph>Menu 1</Typography.Paragraph>
      {showBtn.prev && (
        <div className="button-arrow left" onClick={slideToLeft}>
          <LeftOutlined />
        </div>
      )}
      {showBtn.next && (
        <div className="button-arrow right" onClick={slideToRight}>
          <RightOutlined />
        </div>
      )}
      <Carousel dots={false} className="carousel" ref={sliderRef} slidesPerRow={6}>
        {listDish.map((dish) => {
          return (
            <div className="wrap-dish">
              <DishCard
                status={dish.status}
                src={dish.src}
                name={dish.name}
                price={dish.price}
                description={dish.description}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MenuItem;
