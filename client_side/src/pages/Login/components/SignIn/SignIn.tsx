import InputField from '@/components/InputField/InputField';
import { componentType } from '@/constants/component_type';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './SignIn.less';
import useSignIn from './useSignIn';

const SignIn: React.FC = () => {
  const { formSignIn, handleChangeUsername, handleChangePassword, ...restProps } = useSignIn();
  return (
    <div className="wrap-sign-in">
      <InputField
        icon={<UserOutlined />}
        placeholder="input username"
        value={formSignIn.username}
        onChange={handleChangeUsername}
        status={restProps.error.username}
      />
      <InputField
        icon={<LockOutlined />}
        placeholder="input password"
        type={componentType.PASSWORD}
        value={formSignIn.password}
        onChange={handleChangePassword}
        status={restProps.error.password}
      />
      <div className="wrap-buttons flex-center">
        <Button
          onClick={restProps.handleSubmit}
          className="button-login"
          type={componentType.PRIMARY}
        >
          Sign In
        </Button>
        <Button className="button-login">Sign Up</Button>
      </div>

      <div className="flex-center wrap-links">
        <a className="link-sign-up">Register as a partner</a>
        <a className="link-sign-up">Register as a shipper</a>
      </div>
    </div>
  );
};

export default SignIn;
