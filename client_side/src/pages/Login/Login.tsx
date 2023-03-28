import { assets } from '@/assets';
import { QueryClient, QueryClientProvider } from 'react-query';
import RegisterCustomer from './components/RegisterCustomer/RegisterCustomer';
import './Login.less';

const queryClient = new QueryClient();

const Login: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrap-login flex-center">
        <img className="background" src={assets.BG_LOGIN} alt="background-image" />
        <div className="wrap-form glassmorphism">
          <RegisterCustomer />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Login;
