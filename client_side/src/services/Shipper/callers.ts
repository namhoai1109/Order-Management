import { request } from '@umijs/max';
import { API_GET_ORDER, API_PUT_CONFIRM_DELIVER_ORDER, API_PUT_CONFIRM_ORDER } from './api_paths';

export const getOrders = async (process: string) => {
  return request(`${API_GET_ORDER}/${process}`);
};

export const putConfirmOrder = async (orderCode: string, process: string) => {
  return request(`${API_PUT_CONFIRM_ORDER}/${orderCode}`, {
    method: 'PUT',
    data: {
      process,
    },
  });
};

export const putConfirmDeliverOrder = async (orderCode: string) => {
  return request(`${API_PUT_CONFIRM_DELIVER_ORDER}/${orderCode}`, {
    method: 'PUT',
  });
};
