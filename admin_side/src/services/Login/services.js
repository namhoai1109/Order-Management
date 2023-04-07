import axios from '~/api/axios';
import { API_SIGN_IN } from './api_paths';

export const PostSignIn = async (values) => {
    try {
        const response = await axios.post(API_SIGN_IN, values);
        const token = response?.data?.result?.token;
        const role = response?.data?.result?.role;

        console.log(token);
        console.log(role);

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (role === 'admin') {
            window.location.href = '/admin';
        } else if (role === 'staff') {
            window.location.href = '/staff';
        } else {
            window.location.href = '/';
        }
        
    } catch (error) {
        console.log(error);
    }
};
