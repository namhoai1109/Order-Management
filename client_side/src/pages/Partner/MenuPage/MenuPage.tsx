import MenuItem from '@/components/MenuItem/MenuItem';
import dimensions from '@/constants/dimensions';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import './MenuPage.less';

const fakeData: OBJECT_TYPE.typeDish[] = [
  {
    id: 1,
    status: 'con hang',
    src: 'https://file.hstatic.net/200000395159/article/nau-bun-bo-hue-chuan-vi-tai-nha-voi-cot-co-dac-quoc-viet-foods_59b7ba1543004e67967af718d8afc32b.jpg',
    name: 'Bún bò Huế',
    price: 40000,
    description:
      'Bún bò là một trong những đặc sản của xứ Huế, mặc dù món bún này phổ biến trên cả ba miền ở Việt Nam và cả người Việt tại hải ngoại.',
  },
  {
    id: 2,
    status: 'con hang',
    src: 'https://wujiateavn.com/files/category/cau-chuyen-hong-tra-ngo-gia-gmz2cluw.jpg',
    name: 'Hồng trà ngo gia',
    price: 20000,
    description:
      'Vì là loại trà thơm ngon, tự nhiên và tốt cho sức khỏe nên Hồng Trà Ngô Gia rất được ưa chuộng và nhanh chóng nổi tiếng.',
  },
  {
    id: 3,
    status: 'con hang',
    src: 'https://i1.wp.com/files.agro20.com.br/uploads/2020/01/Caf%C3%A9-expresso-1.jpg?fit=1024%2C618&ssl=1',
    name: 'Espresso Coffee',
    price: 70000,
    description:
      'Espresso, là một phương pháp rang và pha chế cà phê có nguồn gốc từ Ý, trong đó một lượng nhỏ nước sôi gần như bị đè nén dưới áp lực qua hạt cà phê nghiền.',
  },
  {
    id: 4,
    status: 'con hang',
    src: 'https://file.hstatic.net/200000395159/article/nau-bun-bo-hue-chuan-vi-tai-nha-voi-cot-co-dac-quoc-viet-foods_59b7ba1543004e67967af718d8afc32b.jpg',
    name: 'Bún bò Huế',
    price: 40000,
    description:
      'Bún bò là một trong những đặc sản của xứ Huế, mặc dù món bún này phổ biến trên cả ba miền ở Việt Nam và cả người Việt tại hải ngoại.',
  },
  {
    id: 5,
    status: 'con hang',
    src: 'https://wujiateavn.com/files/category/cau-chuyen-hong-tra-ngo-gia-gmz2cluw.jpg',
    name: 'Hồng trà ngo gia',
    price: 20000,
    description:
      'Vì là loại trà thơm ngon, tự nhiên và tốt cho sức khỏe nên Hồng Trà Ngô Gia rất được ưa chuộng và nhanh chóng nổi tiếng.',
  },
  {
    id: 6,
    status: 'con hang',
    src: 'https://i1.wp.com/files.agro20.com.br/uploads/2020/01/Caf%C3%A9-expresso-1.jpg?fit=1024%2C618&ssl=1',
    name: 'Espresso Coffee',
    price: 70000,
    description:
      'Espresso, là một phương pháp rang và pha chế cà phê có nguồn gốc từ Ý, trong đó một lượng nhỏ nước sôi gần như bị đè nén dưới áp lực qua hạt cà phê nghiền.',
  },
  {
    id: 7,
    status: 'con hang',
    src: 'https://wujiateavn.com/files/category/cau-chuyen-hong-tra-ngo-gia-gmz2cluw.jpg',
    name: 'Hồng trà ngo gia',
    price: 20000,
    description:
      'Vì là loại trà thơm ngon, tự nhiên và tốt cho sức khỏe nên Hồng Trà Ngô Gia rất được ưa chuộng và nhanh chóng nổi tiếng.',
  },
  {
    id: 8,
    status: 'con hang',
    src: 'https://i1.wp.com/files.agro20.com.br/uploads/2020/01/Caf%C3%A9-expresso-1.jpg?fit=1024%2C618&ssl=1',
    name: 'Espresso Coffee',
    price: 70000,
    description:
      'Espresso, là một phương pháp rang và pha chế cà phê có nguồn gốc từ Ý, trong đó một lượng nhỏ nước sôi gần như bị đè nén dưới áp lực qua hạt cà phê nghiền.',
  },
];

const MenuPage: React.FC = () => {
  return (
    <div className="wrap-menu-page">
      <Typography.Paragraph className="add-menu-btn">
        new menu <PlusCircleOutlined className="icon" />
      </Typography.Paragraph>
      <Row gutter={[dimensions.GUTTER_16, dimensions.GUTTER_16]}>
        <Col span={dimensions.SPAN_24}>
          <MenuItem listDish={fakeData} />
        </Col>
      </Row>
    </div>
  );
};

export default MenuPage;
