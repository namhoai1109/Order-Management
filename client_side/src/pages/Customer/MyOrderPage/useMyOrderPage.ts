import { useGetMyOrder } from '@/services/Customer/services';

const useMyOrderPage = () => {
  const { data, isLoading } = useGetMyOrder();

  return {
    orders: data?.result || [],
    isLoading,
  };
};

export default useMyOrderPage;
