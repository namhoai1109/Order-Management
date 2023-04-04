import axios from '~/api/axios';

export const PostSignIn = async (values) => {
    try {
        const response = await axios.post('/api/auth/login', values);
        const token = response?.data?.result?.token;
        const role = response?.data?.result?.role;

        console.log("Token Login: " + token);
        console.log('Role Login: ' + role);
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
