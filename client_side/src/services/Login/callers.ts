import { methodAPI } from '@/constants/method_api';
import { request } from '@umijs/max';
import {
  API_SIGN_IN,
  API_SIGN_UP_CUSTOMER,
  API_SIGN_UP_PARTNER,
  API_SIGN_UP_SHIPPER,
} from './api_paths';

export const postSignIn = async (username: string, password: string) => {
  return request(API_SIGN_IN, {
    method: methodAPI.POST,
    data: {
      username,
      password,
    },
  });
};

export const postSignUpCustomer = async (form: TFormSignUpCustomer) => {
  return request(API_SIGN_UP_CUSTOMER, {
    method: methodAPI.POST,
    data: form,
  });
};

export const postSignUpShipper = async (form: TFormSignUpShipper) => {
  return request(API_SIGN_UP_SHIPPER, {
    method: methodAPI.POST,
    data: form,
  });
};

export const postSignUpPartner = async (form: TFormSignUpPartner) => {
  return request(API_SIGN_UP_PARTNER, {
    method: methodAPI.POST,
    data: form,
  });
};
