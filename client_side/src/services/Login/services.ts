import { useMutation } from 'react-query';
import { postSignIn, postSignUpCustomer, postSignUpPartner, postSignUpShipper } from './callers';
import { keyLocalStorage, setKey } from '@/utils/local_storage';
import { message } from 'antd';
import { internalLink } from '@/constants/internal_link';
import { roles } from '@/constants/roles';

export const getKeyLogIn = {
  logIn: ['LOG_IN'],
  signUpCustomer: ['SIGN_UP_CUSTOMER'],
  signUpShipper: ['SIGN_UP_SHIPPER'],
  signUpPartner: ['SIGN_UP_PARTNER'],
};

export const usePostSignIn = (username: string, password: string) => {
  return useMutation<TTemplateResponse<TSignInResponse>, Error>({
    mutationKey: getKeyLogIn.logIn,
    mutationFn: () => postSignIn(username, password),
    retry: false,
    onSuccess: (data) => {
      if (data.result) {
        message.error('Sign in successfully !');
        setKey(keyLocalStorage.TOKEN, data.result.token);
        setKey(keyLocalStorage.ROLE, data.result.role);
        setKey(keyLocalStorage.USERNAME, data.result.username);
        switch (data.result.role) {
          case roles.PARTNER:
            window.location.href = internalLink.PARTNER;
            break;
          case roles.SHIPPER:
            window.location.href = internalLink.SHIPPER;
            break;
          case roles.CUSTOMER:
            window.location.href = internalLink.CUSTOMER;
            break;
          default:
            window.location.href = internalLink.HOME;
        }
      }
    },
    onError() {
      message.error('Sign in failed !');
    },
  });
};

export const usePostSignUpCustomer = (onSuccess: () => void) => {
  return useMutation<TTemplateResponse<null>, Error, TFormSignUpCustomer>({
    mutationKey: getKeyLogIn.signUpCustomer,
    mutationFn: (form) => postSignUpCustomer(form),
    onSuccess,
    onError() {
      message.error('Sign up failed !');
    },
  });
};

export const usePostSignUpShipper = (onSuccess: () => void) => {
  return useMutation<TTemplateResponse<null>, Error, TFormSignUpShipper>({
    mutationKey: getKeyLogIn.signUpShipper,
    mutationFn: (form) => postSignUpShipper(form),
    onSuccess,
    onError() {
      message.error('Sign up failed !');
    },
  });
};

export const usePostSignUpPartner = (onSuccess: () => void) => {
  return useMutation<TTemplateResponse<null>, Error, TFormSignUpPartner>({
    mutationKey: getKeyLogIn.signUpPartner,
    mutationFn: (form) => postSignUpPartner(form),
    onSuccess,
    onError() {
      message.error('Sign up failed !');
    },
  });
};
