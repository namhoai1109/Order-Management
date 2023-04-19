import { useMutation, useQuery } from 'react-query';
import { getDishes, getMyOrder, getPartners, postOrder } from './callers';

export const getKeyCustomer = {
  partners: ['PARTNERS'],
  dishes: ['DISHES'],
  myOrder: ['MY_ORDER'],
};

export const postKeyCustomer = {
  orders: ['ORDERS'],
};

export const useGetPartners = () => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TPartner[]>, Error>({
    queryKey: getKeyCustomer.partners,
    queryFn: () => getPartners(),
  });
};

export const useGetDishes = (id: string) => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TDish[]>, Error>({
    queryKey: getKeyCustomer.dishes,
    queryFn: () => getDishes(id),
  });
};

export const usePostOrder = (onSuccess: TCallbackVoid) => {
  return useMutation<TTemplateResponse<null>, Error, TDataOrder>({
    mutationKey: postKeyCustomer.orders,
    mutationFn: (data: TDataOrder) => postOrder(data),
    onSuccess,
  });
};

export const useGetMyOrder = () => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TOrder[]>, Error>({
    queryKey: getKeyCustomer.myOrder,
    queryFn: () => getMyOrder(),
  });
};
