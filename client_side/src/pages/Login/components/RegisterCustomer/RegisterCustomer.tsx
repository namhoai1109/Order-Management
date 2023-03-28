import InputField from '@/components/InputField/InputField';
import { componentMode } from '@/constants/component_mode';
import dimensions from '@/constants/dimensions';
import { UserOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import './RegisterCustomer.less';

const RegisterCustomer: React.FC = () => {
  return (
    <div className="wrap-register-user">
      <Typography.Title level={2} className="title">
        Register to order your favorite dishes!
      </Typography.Title>
      <Row justify={componentMode.START} gutter={[dimensions.GUTTER_16, dimensions.GUTTER_16]} wrap>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField icon={<UserOutlined />} placeholder="input username" />
        </Col>
      </Row>
    </div>
  );
};

export default RegisterCustomer;
