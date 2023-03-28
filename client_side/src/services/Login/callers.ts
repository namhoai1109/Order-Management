import { methodAPI } from '@/constants/method_api';
import { request } from '@umijs/max';
import { API_SIGN_IN } from './api_paths';

export const postSignIn = async (username: string, password: string) => {
  return request(API_SIGN_IN, {
    method: methodAPI.POST,
    data: {
      username,
      password,
    },
  });
};
