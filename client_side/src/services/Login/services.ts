import { useMutation, useQuery } from 'react-query';
import { postSignIn } from './callers';
import { keyLocalStorage, setKey } from '@/utils/local_storage';
import { message } from 'antd';

export const queryKeyLogIn = {
  SIGN_IN: 'SIGN_IN',
};

export const usePostSignIn = (username: string, password: string) => {
  return useMutation<TTemplateResponse<TSignInResponse>, Error>({
    mutationFn: () => postSignIn(username, password),
    retry: false,
    onSuccess: (data) => {
      if (data.result) {
        message.error('Sign in successfully !');
        setKey(keyLocalStorage.TOKEN, data.result.token);
        setKey(keyLocalStorage.ROLE, data.result.role);
        setKey(keyLocalStorage.USERNAME, data.result.username);
        window.location.href = '/';
      }
    },
    onError() {
      message.error('Sign in failed !');
    },
  });
};
