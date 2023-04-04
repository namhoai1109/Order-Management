import { useGetDishes } from '@/services/Partner/services';

const useMenuPage = () => {
  const responseAPI = useGetDishes();
  return { dishes: responseAPI.data?.result || [] };
};

export default useMenuPage;
