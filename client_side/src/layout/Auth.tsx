import { roles } from '@/constants/roles';
import NoFoundPage from '@/pages/404';
import { Access, useAccess } from '@umijs/max';

const Auth: React.FC<TAuth> = ({ role, children }) => {
  const access = useAccess();

  const isAccessible = (role: string) => {
    switch (role) {
      case roles.PARTNER:
        return access.isPartner;
      case roles.SHIPPER:
        return access.isShipper;
      case roles.CUSTOMER:
        return access.isCustomer;
      default:
        return false;
    }
  };

  return (
    <Access accessible={isAccessible(role)} fallback={<NoFoundPage />}>
      {children}
    </Access>
  );
};

export default Auth;
