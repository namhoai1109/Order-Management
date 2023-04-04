import BuildingsIcon from '@/components/Icon/BuildingsIcon';
import InputField from '@/components/InputField/InputField';
import { componentMode } from '@/constants/component_mode';
import { componentType } from '@/constants/component_type';
import dimensions from '@/constants/dimensions';
import { internalLink } from '@/constants/internal_link';
import {
  BankOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
  RestOutlined,
  ShopOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, Col, Row, Select, Typography } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import ModalSubmit from '../ModalSubmit/ModalSubmit';
import BranchLocation from './components/BranchLocation/BranchLocation';
import { keyRegisterPartner } from './constants';
import './RegisterPartner.less';
import useRegisterPartner from './useRegisterPartner';

const culinaryStyle = [
  {
    value: 'Drink',
    label: 'Drink',
  },
  {
    value: 'Fast food',
    label: 'Fast food',
  },
  {
    value: 'Fruit',
    label: 'Fruit',
  },
  {
    value: 'Thai food',
    label: 'Thai food',
  },
  {
    value: 'Vietnamese food',
    label: 'Vietnamese food',
  },
];

const renderBranchLocation = (
  listBranches: OBJECT_TYPE.TBranch[],
  listDistrict: OBJECT_TYPE.TDistrict[],
  isSubmit: boolean,
  deleteBranch: (indexBranch: number) => void,
  onChangeAddressBranch: (value: string, indexBranch: number) => void,
  onChangeDistrictBranch: (value: number, indexBranch: number) => void,
) => {
  return listBranches.map((branch, indexBranch) => {
    return (
      <Col span={dimensions.SPAN_24} key={indexBranch}>
        <BranchLocation
          isSubmit={isSubmit}
          indexBranch={indexBranch}
          listDistrict={listDistrict}
          address={branch.address}
          districtId={branch.districtId}
          onChangeDistrictBranch={onChangeDistrictBranch}
          onChangeAddressBranch={onChangeAddressBranch}
          deleteBranch={deleteBranch}
        />
      </Col>
    );
  });
};

const RegisterPartner: React.FC = () => {
  const {
    provinces,
    values,
    error,
    listDistrict,
    listBranches,
    isSubmit,
    isLoading,
    openModal,
    onOKModal,
    deleteBranch,
    addBranch,
    onSubmit,
    onChangeAddressBranch,
    onChangeDistrictBranch,
    handleChangeInput,
    handleChangeSelect,
  } = useRegisterPartner();
  return (
    <div className="wrap-register-partner">
      <ModalSubmit
        message="Please check your mail to verify your contract!"
        onOKModal={onOKModal}
        open={openModal}
      />
      <Typography.Title level={2} className="title">
        Become a partner to earn money!
      </Typography.Title>
      <Row gutter={dimensions.GUTTERS_16}>
        <Col span={dimensions.SPAN_8}>
          <InputField
            icon={<UserOutlined />}
            placeholder="username"
            status={error[keyRegisterPartner.USERNAME] as InputStatus}
            value={values[keyRegisterPartner.USERNAME]}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterPartner.USERNAME)}
          />
          <InputField
            icon={<LockOutlined />}
            placeholder="password"
            type={componentType.PASSWORD}
            status={error[keyRegisterPartner.PASSWORD] as InputStatus}
            value={values[keyRegisterPartner.PASSWORD]}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterPartner.PASSWORD)}
          />
          <InputField
            icon={<LockOutlined />}
            placeholder="confirm password"
            type={componentType.PASSWORD}
            status={error[keyRegisterPartner.CONFIRM_PASSWORD] as InputStatus}
            value={values[keyRegisterPartner.CONFIRM_PASSWORD]}
            onChange={(eventChange) =>
              handleChangeInput(eventChange, keyRegisterPartner.CONFIRM_PASSWORD)
            }
          />
          <InputField
            icon={<ShopOutlined />}
            placeholder="brand name"
            status={error[keyRegisterPartner.BRAND_NAME] as InputStatus}
            value={values[keyRegisterPartner.BRAND_NAME]}
            onChange={(eventChange) =>
              handleChangeInput(eventChange, keyRegisterPartner.BRAND_NAME)
            }
          />
          <InputField
            icon={<UserDeleteOutlined />}
            placeholder="representative"
            status={error[keyRegisterPartner.REPRESENTATIVE] as InputStatus}
            value={values[keyRegisterPartner.REPRESENTATIVE]}
            onChange={(eventChange) =>
              handleChangeInput(eventChange, keyRegisterPartner.REPRESENTATIVE)
            }
          />
          <InputField
            icon={<MailOutlined />}
            placeholder="email"
            status={error[keyRegisterPartner.EMAIL] as InputStatus}
            value={values[keyRegisterPartner.EMAIL]}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterPartner.EMAIL)}
          />
          <InputField
            icon={<PhoneOutlined />}
            placeholder="phone"
            value={values[keyRegisterPartner.PHONE]}
            status={error[keyRegisterPartner.PHONE] as InputStatus}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterPartner.PHONE)}
          />
          <InputField
            icon={<BankOutlined />}
            placeholder="bank account"
            status={error[keyRegisterPartner.BANK_ACCOUNT] as InputStatus}
            value={values[keyRegisterPartner.BANK_ACCOUNT]}
            onChange={(eventChange) =>
              handleChangeInput(eventChange, keyRegisterPartner.BANK_ACCOUNT)
            }
          />
          <div className="wrap-select flex-center">
            <span className="icon">
              <BuildingsIcon />
            </span>
            <Select
              placeholder="province"
              options={provinces}
              className="select"
              status={error[keyRegisterPartner.PROVINCE] as InputStatus}
              onChange={(value) => handleChangeSelect(value, keyRegisterPartner.PROVINCE)}
            />
          </div>
          <div className="wrap-select flex-center">
            <RestOutlined className="icon" />
            <Select
              placeholder="culinary style"
              options={culinaryStyle}
              className="select"
              status={error[keyRegisterPartner.CULINARY_STYLE] as InputStatus}
              onChange={(value) => handleChangeSelect(value, keyRegisterPartner.CULINARY_STYLE)}
            />
          </div>
          <InputField
            icon={<NumberOutlined />}
            placeholder="tax code"
            status={error[keyRegisterPartner.TAX_CODE] as InputStatus}
            value={values[keyRegisterPartner.TAX_CODE]}
            onChange={(eventChange) => handleChangeInput(eventChange, keyRegisterPartner.TAX_CODE)}
          />
          <Row className="wrap-buttons" justify={componentMode.CENTER}>
            <Button
              loading={isLoading}
              className="button-form"
              type={componentType.PRIMARY}
              onClick={onSubmit}
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
        </Col>
        <Col span={dimensions.SPAN_16}>
          <Card className="wrap-branches">
            <div onClick={addBranch} className="wrap-add-branch flex-center">
              <span className="title-btn">new branch</span>
              <PlusCircleOutlined />
            </div>
            <Row gutter={dimensions.GUTTERS_16} className="list-branches">
              {renderBranchLocation(
                listBranches,
                listDistrict,
                isSubmit,
                deleteBranch,
                onChangeAddressBranch,
                onChangeDistrictBranch,
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPartner;
