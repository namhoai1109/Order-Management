import BuildingsIcon from '@/components/Icon/BuildingsIcon';
import DistrictIcon from '@/components/Icon/District';
import InputField from '@/components/InputField/InputField';
import { componentMode } from '@/constants/component_mode';
import { componentType } from '@/constants/component_type';
import dimensions from '@/constants/dimensions';
import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Select, Typography } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import ModalSubmit from '../ModalSubmit/ModalSubmit';
import { keyRegisterCustomer } from './constants';
import './RegisterCustomer.less';
import useRegisterCustomer from './useRegisterCustomer';

const RegisterCustomer: React.FC = () => {
  const { values, handleChangeInput, handleChangeSelect, ...restProps } = useRegisterCustomer();

  return (
    <div className="wrap-register-user">
      <ModalSubmit
        open={restProps.openModal}
        onOKModal={restProps.onOKModal}
        message="Please check your email to verify your account!"
      />
      <Typography.Title level={2} className="title">
        Register to order your favorite dishes!
      </Typography.Title>
      <Row justify={componentMode.START} gutter={[dimensions.GUTTER_16, dimensions.GUTTER_16]} wrap>
        <Col span={dimensions.SPAN_12}>
          <InputField
            icon={<UserOutlined />}
            placeholder="username"
            value={values[keyRegisterCustomer.USERNAME]}
            status={restProps.error[keyRegisterCustomer.USERNAME] as InputStatus}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterCustomer.USERNAME)}
          />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField
            icon={<PhoneOutlined />}
            placeholder="phone number"
            value={values[keyRegisterCustomer.PHONE]}
            status={restProps.error[keyRegisterCustomer.PHONE] as InputStatus}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterCustomer.PHONE)}
          />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField
            icon={<LockOutlined />}
            placeholder="password"
            type={componentType.PASSWORD}
            value={values[keyRegisterCustomer.PASSWORD]}
            status={restProps.error[keyRegisterCustomer.PASSWORD] as InputStatus}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterCustomer.PASSWORD)}
          />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <div className="wrap-select flex-center">
            <BuildingsIcon />
            <Select
              placeholder="province/city"
              options={restProps.listProvinces}
              className="select"
              status={restProps.error[keyRegisterCustomer.PROVINCE] as InputStatus}
              onChange={(value) => handleChangeSelect(value, keyRegisterCustomer.PROVINCE)}
            />
          </div>
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField
            icon={<LockOutlined />}
            placeholder="confirm password"
            type={componentType.PASSWORD}
            value={values[keyRegisterCustomer.CONFIRM_PASSWORD]}
            status={restProps.error[keyRegisterCustomer.CONFIRM_PASSWORD] as InputStatus}
            onChange={(eventChange) =>
              handleChangeInput(eventChange, keyRegisterCustomer.CONFIRM_PASSWORD)
            }
          />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <div className="wrap-select flex-center">
            <DistrictIcon />
            <Select
              placeholder="district"
              options={restProps.listDistrict}
              className="select"
              status={restProps.error[keyRegisterCustomer.DISTRICT] as InputStatus}
              onChange={(value) => handleChangeSelect(value, keyRegisterCustomer.DISTRICT)}
            />
          </div>
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField
            icon={<UserDeleteOutlined />}
            placeholder="full name"
            value={values[keyRegisterCustomer.FULL_NAME]}
            status={restProps.error[keyRegisterCustomer.FULL_NAME] as InputStatus}
            onChange={(eventChange) =>
              handleChangeInput(eventChange, keyRegisterCustomer.FULL_NAME)
            }
          />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField
            icon={<HomeOutlined />}
            placeholder="address"
            value={values[keyRegisterCustomer.ADDRESS]}
            status={restProps.error[keyRegisterCustomer.ADDRESS] as InputStatus}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterCustomer.ADDRESS)}
          />
        </Col>
        <Col span={dimensions.SPAN_12}>
          <InputField
            icon={<MailOutlined />}
            placeholder="email"
            value={values[keyRegisterCustomer.EMAIL]}
            status={restProps.error[keyRegisterCustomer.EMAIL] as InputStatus}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterCustomer.EMAIL)}
          />
        </Col>
      </Row>
      <Row className="wrap-buttons" justify={componentMode.CENTER}>
        <Button
          className="button-form"
          onClick={restProps.submitForm}
          loading={restProps.isLoading}
          type={componentType.PRIMARY}
        >
          Register
        </Button>
        <Button className="button-form" onClick={restProps.cancelForm}>
          Cancel
        </Button>
      </Row>
    </div>
  );
};

export default RegisterCustomer;
