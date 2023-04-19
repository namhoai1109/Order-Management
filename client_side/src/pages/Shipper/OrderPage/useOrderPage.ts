import { orderProcess } from '@/constants/constants_order';
import { useGetOrders } from '@/services/Shipper/services';

const useOrderPage = () => {
  const { data, isLoading } = useGetOrders(orderProcess.PENDING);

  return {
    orders: data?.result || [],
    isLoading,
  };
};

export default useOrderPage;
