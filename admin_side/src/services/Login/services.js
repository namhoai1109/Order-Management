import { post } from '~/utils/httpRequest';
import { API_SIGN_IN } from './api_paths';

export const PostSignIn = async (values) => {
    try {
        const response = await post(API_SIGN_IN, values);
        const token = response?.result?.token;
        const role = response?.result?.role;

        console.log('token', token);
        console.log('role', role);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (role === 'admin') {
            window.location.href = '/admin';
        } else if (role === 'staff') {
            window.location.href = '/staff';
        } else {
            window.location.href = '/';
        }
        return response;
    } catch (error) {
        return error.response.data.message;
    }
};
