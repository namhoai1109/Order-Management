import { useQuery } from 'react-query';
import { getDishes } from './callers';

export const getKeyPartner = {
  dishes: ['DISHES'],
};

export const useGetDishes = () => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TDish[]>, Error>({
    queryKey: getKeyPartner.dishes,
    queryFn: () => getDishes(),
  });
};
