import { methodAPI } from '@/constants/method_api';
import { request } from '@umijs/max';
import { API_GET_DISHES, API_GET_MY_ORDER, API_GET_PARTNERS, API_POST_ORDER } from './api_paths';

export const getPartners = async () => {
  return request(API_GET_PARTNERS);
};

export const getDishes = async (id: string) => {
  return request(`${API_GET_DISHES}/${id}`);
};

export const postOrder = async (data: TDataOrder) => {
  return request(API_POST_ORDER, {
    method: methodAPI.POST,
    data,
  });
};

export const getMyOrder = async () => {
  return request(API_GET_MY_ORDER);
};
