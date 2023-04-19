import { componentMode } from '@/constants/component_mode';
import dimensions from '@/constants/dimensions';
import { typography } from '@/constants/typography';
import { Col, Row, Typography } from 'antd';
import './OptionDishItem.less';

interface IOptionDishItemProps {
  optionName: string;
  optionPrice: string;
}

const OptionDishItem: React.FC<IOptionDishItemProps> = ({ optionName, optionPrice }) => {
  return (
    <Row justify={componentMode.CENTER} className="wrap-option-detail-item">
      <Col span={dimensions.SPAN_14} className="option-name-col flex-center">
        <Typography.Paragraph
          ellipsis={{
            rows: typography.MAX_ROW_1,
            symbol: typography.OVERFLOW_SYMBOL,
            tooltip: optionName,
          }}
          className="option-name"
        >
          {optionName}
        </Typography.Paragraph>
      </Col>
      <Col span={dimensions.SPAN_10} className="option-price-col flex-center">
        <span>{`${optionPrice} VND`}</span>
      </Col>
    </Row>
  );
};

export default OptionDishItem;
