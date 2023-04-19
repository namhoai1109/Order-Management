import { message } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { getDishes, getOrders, postDish, putConfirmOrder } from './callers';

export const getKeyPartner = {
  dishes: ['DISHES'],
  orders: ['ORDERS'],
};

export const useGetDishes = () => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TDish[]>, Error>({
    queryKey: getKeyPartner.dishes,
    queryFn: () => getDishes(),
  });
};

export const usePostDish = () => {
  return useMutation<TTemplateResponse<null>, Error, FormData>((data) => postDish(data), {
    onSuccess: () => {
      message.success('Add dish successfully !');
      history.back();
    },
  });
};

export const useGetOrders = () => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TOrder[]>, Error>({
    queryKey: getKeyPartner.orders,
    queryFn: () => getOrders(),
  });
};

export const usePutConfirmOrder = (onSuccess: TCallbackVoid) => {
  return useMutation<TTemplateResponse<null>, Error, string>({
    mutationKey: getKeyPartner.orders,
    mutationFn: (orderCode) => putConfirmOrder(orderCode),
    onSuccess,
  });
};
