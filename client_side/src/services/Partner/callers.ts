import { methodAPI } from '@/constants/method_api';
import { request } from '@umijs/max';
import { API_GET_DISHES, API_GET_ORDERS, API_POST_DISH, API_PUT_CONFIRM_ORDER } from './api_paths';

export const getDishes = async () => {
  return request(API_GET_DISHES);
};

export const postDish = async (data: FormData) => {
  return request(API_POST_DISH, {
    method: methodAPI.POST,
    data,
  });
};

export const getOrders = async () => {
  return request(API_GET_ORDERS);
};

export const putConfirmOrder = async (orderCode: string) => {
  return request(`${API_PUT_CONFIRM_ORDER}/${orderCode}`, {
    method: methodAPI.PUT,
  });
};
