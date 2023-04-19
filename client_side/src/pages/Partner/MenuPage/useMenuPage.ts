import { useGetDishes } from '@/services/Partner/services';

const useMenuPage = () => {
  const { data, isLoading } = useGetDishes();

  return { dishes: data?.result || [], isLoading };
};

export default useMenuPage;
