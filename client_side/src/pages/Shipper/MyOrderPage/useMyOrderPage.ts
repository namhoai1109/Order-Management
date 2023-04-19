import { orderProcess } from '@/constants/constants_order';
import { useGetOrders } from '@/services/Shipper/services';

const useMyOrderPage = () => {
  const { data, isLoading } = useGetOrders(orderProcess.ALL);

  return {
    orders: data?.result || [],
    isLoading,
  };
};

export default useMyOrderPage;
