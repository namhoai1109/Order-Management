import { postSignIn } from './callers';

export const usedPostSignIn = async (values) => {
    try {
        const response = await postSignIn(values);
        const token = response?.result?.token;
        const role = response?.result?.role;

        if (token && role) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (role === 'admin') {
                window.location.href = '/admin';
            } else if (role === 'staff') {
                window.location.href = '/staff';
            } else {
                window.location.href = '/';
            }
        }
        return response;
    } catch (error) {
        return error.response.data.message;
    }
};
