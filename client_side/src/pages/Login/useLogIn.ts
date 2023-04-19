import { useLocation } from '@umijs/max';

const useLogin = () => {
  const location = useLocation();
  const paths = location.pathname.split('/');

  return {
    logInKey: paths[1],
    roleSignUpKey: paths[2],
  };
};

export default useLogin;
