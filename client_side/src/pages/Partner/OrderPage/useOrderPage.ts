import { useGetOrders } from '@/services/Partner/services';

const useOrderPage = () => {
  const { data, isLoading } = useGetOrders();
  return {
    orders: data?.result || [],
    isLoading,
  };
};
export default useOrderPage;
