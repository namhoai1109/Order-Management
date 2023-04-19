import BuildingsIcon from '@/components/Icon/BuildingsIcon';
import DistrictIcon from '@/components/Icon/District';
import IDIcon from '@/components/Icon/IDIcon';
import MotoIcon from '@/components/Icon/MotoIcon';
import InputField from '@/components/InputField/InputField';
import { componentMode } from '@/constants/component_mode';
import { componentType } from '@/constants/component_type';
import dimensions from '@/constants/dimensions';
import { internalLink } from '@/constants/internal_link';
import {
  BankOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Col, Row, Select, Typography } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import ModalSubmit from '../ModalSubmit/ModalSubmit';
import { keyRegisterShipper } from './constants';
import './RegisterShipper.less';
import useRegisterShipper from './useRegisterShipper';

const RegisterShipper: React.FC = () => {
  const { values, handleChangeInput, handleChangeSelect, ...restProps } = useRegisterShipper();
  return (
    <div className="wrap-register-shipper">
      <ModalSubmit
        open={restProps.openModal}
        onOKModal={restProps.onOKModal}
        message="Please check your email to verify your account!"
      />
      <Typography.Title level={2} className="title">
        Become a shipper to earn money!
      </Typography.Title>
      <Row gutter={dimensions.GUTTERS_16}>
        <Col span={dimensions.SPAN_8}>
          <Row gutter={dimensions.GUTTERS_16}>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<UserOutlined />}
                placeholder="username"
                value={values[keyRegisterShipper.USERNAME]}
                status={restProps.error[keyRegisterShipper.USERNAME] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.USERNAME)
                }
              />
            </Col>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<LockOutlined />}
                type={componentType.PASSWORD}
                placeholder="password"
                value={values[keyRegisterShipper.PASSWORD]}
                status={restProps.error[keyRegisterShipper.PASSWORD] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.PASSWORD)
                }
              />
            </Col>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<LockOutlined />}
                type={componentType.PASSWORD}
                placeholder="confirm password"
                value={values[keyRegisterShipper.CONFIRM_PASSWORD]}
                status={restProps.error[keyRegisterShipper.CONFIRM_PASSWORD] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.CONFIRM_PASSWORD)
                }
              />
            </Col>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<UserDeleteOutlined />}
                placeholder="full name"
                value={values[keyRegisterShipper.FULL_NAME]}
                status={restProps.error[keyRegisterShipper.FULL_NAME] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.FULL_NAME)
                }
              />
            </Col>
          </Row>
        </Col>
        <Col span={dimensions.SPAN_8}>
          <Row gutter={dimensions.GUTTERS_16}>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<IDIcon />}
                placeholder="national ID"
                value={values[keyRegisterShipper.NATIONAL_ID]}
                status={restProps.error[keyRegisterShipper.NATIONAL_ID] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.NATIONAL_ID)
                }
              />
            </Col>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<UserOutlined />}
                placeholder="phone number"
                value={values[keyRegisterShipper.PHONE]}
                status={restProps.error[keyRegisterShipper.PHONE] as InputStatus}
                onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterShipper.PHONE)}
              />
            </Col>
            <Col span={dimensions.SPAN_24}>
              <div className="wrap-select flex-center">
                <BuildingsIcon />
                <Select
                  placeholder="province/city"
                  options={restProps.listProvince}
                  className="select"
                  status={restProps.error[keyRegisterShipper.PROVINCE] as InputStatus}
                  onChange={(value) => handleChangeSelect(value, keyRegisterShipper.PROVINCE)}
                />
              </div>
            </Col>
            <Col span={dimensions.SPAN_24}>
              <div className="wrap-select flex-center">
                <DistrictIcon />
                <Select
                  placeholder="district"
                  options={restProps.listDistrict}
                  className="select"
                  status={restProps.error[keyRegisterShipper.DISTRICT] as InputStatus}
                  onChange={(value) => handleChangeSelect(value, keyRegisterShipper.DISTRICT)}
                />
              </div>
            </Col>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<HomeOutlined />}
                placeholder="address"
                value={values[keyRegisterShipper.ADDRESS]}
                status={restProps.error[keyRegisterShipper.ADDRESS] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.ADDRESS)
                }
              />
            </Col>
          </Row>
        </Col>
        <Col span={dimensions.SPAN_8}>
          <Row gutter={dimensions.GUTTERS_16}>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<MotoIcon />}
                placeholder="license plates"
                value={values[keyRegisterShipper.LICENSE_PLATE]}
                status={restProps.error[keyRegisterShipper.LICENSE_PLATE] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.LICENSE_PLATE)
                }
              />
            </Col>
            <Col span={dimensions.SPAN_24}>
              <div className="wrap-select flex-center">
                <DistrictIcon />
                <Select
                  placeholder="active area"
                  options={restProps.listDistrict}
                  className="select"
                  status={restProps.error[keyRegisterShipper.ACTIVE_AREA] as InputStatus}
                  onChange={(value) => handleChangeSelect(value, keyRegisterShipper.ACTIVE_AREA)}
                />
              </div>
            </Col>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<MailOutlined />}
                placeholder="email"
                value={values[keyRegisterShipper.EMAIL]}
                status={restProps.error[keyRegisterShipper.EMAIL] as InputStatus}
                onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterShipper.EMAIL)}
              />
            </Col>
            <Col span={dimensions.SPAN_24}>
              <InputField
                icon={<BankOutlined />}
                placeholder="bank account"
                value={values[keyRegisterShipper.BANK_ACCOUNT]}
                status={restProps.error[keyRegisterShipper.BANK_ACCOUNT] as InputStatus}
                onChange={(eventChange) =>
                  handleChangeInput(eventChange, keyRegisterShipper.BANK_ACCOUNT)
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="wrap-buttons" justify={componentMode.CENTER}>
        <Button
          loading={restProps.isLoading}
          className="button-form"
          type={componentType.PRIMARY}
          onClick={restProps.submitForm}
        >
          Register
        </Button>
        <Button
          onClick={() => {
            history.replace(internalLink.LOGIN);
          }}
          className="button-form"
        >
          Cancel
        </Button>
      </Row>
    </div>
  );
};

export default RegisterShipper;
