import { request } from '@umijs/max';
import { API_GET_DISHES } from './api_paths';

export const getDishes = async () => {
  return request(API_GET_DISHES);
};
