import { assets } from '@/assets';
import { roles } from '@/constants/roles';
import { QueryClient, QueryClientProvider } from 'react-query';
import RegisterCustomer from './components/RegisterCustomer/RegisterCustomer';
import RegisterPartner from './components/RegisterPartner/RegisterPartner';
import RegisterShipper from './components/RegisterShipper/RegisterShipper';
import SignIn from './components/SignIn/SignIn';
import './Login.less';
import useLogin from './useLogIn';

const queryClient = new QueryClient();
const LOGIN_KEY = 'login';

const renderForm = (logInKey: string, roleSignUpKey: string) => {
  if (logInKey === LOGIN_KEY) {
    return <SignIn />;
  } else {
    switch (roleSignUpKey) {
      case roles.CUSTOMER:
        return <RegisterCustomer />;
      case roles.SHIPPER:
        return <RegisterShipper />;
      case roles.PARTNER:
        return <RegisterPartner />;
      default:
        return <SignIn />;
    }
  }
};

const Login: React.FC = () => {
  const { logInKey, roleSignUpKey } = useLogin();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrap-login flex-center">
        <img className="background" src={assets.BG_LOGIN} alt="background-image" />
        <div className="wrap-form glassmorphism">{renderForm(logInKey, roleSignUpKey)}</div>
      </div>
    </QueryClientProvider>
  );
};

export default Login;
