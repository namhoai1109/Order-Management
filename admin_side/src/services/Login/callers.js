import { API_SIGN_IN } from './api_paths'
import { post } from '~/utils/httpRequest';

export const postSignIn = async (values) => {
    const response = await post(API_SIGN_IN, values);
    return response;
};
