import { useMutation, useQuery } from 'react-query';
import { getOrders, putConfirmDeliverOrder, putConfirmOrder } from './callers';

export const getKeyShipper = {
  orders: ['ORDERS'],
  ordersKey: (process: string) => [...getKeyShipper.orders, process],
};

export const putKeyShipper = {
  confirmOrder: () => [...getKeyShipper.orders],
  confirmDeliverOrder: () => [...getKeyShipper.orders],
};

export const useGetOrders = (process: string) => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TOrder[]>, Error>({
    queryKey: getKeyShipper.ordersKey(process),
    queryFn: () => getOrders(process),
  });
};

export const usePutConfirmOrder = (onSuccess: TCallbackVoid) => {
  return useMutation<
    TTemplateResponse<OBJECT_TYPE.TOrder>,
    Error,
    {
      orderCode: string;
      process: string;
    }
  >({
    mutationKey: putKeyShipper.confirmOrder(),
    mutationFn: ({ orderCode, process }) => putConfirmOrder(orderCode, process),
    onSuccess,
  });
};

export const usePutConfirmDeliverOrder = (onSuccess: TCallbackVoid) => {
  return useMutation<TTemplateResponse<OBJECT_TYPE.TOrder>, Error, string>({
    mutationKey: putKeyShipper.confirmDeliverOrder(),
    mutationFn: (orderCode: string) => putConfirmDeliverOrder(orderCode),
    onSuccess,
  });
};
