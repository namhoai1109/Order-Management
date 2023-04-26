import 'react-toastify/dist/ReactToastify.css';
import { usedPostSignIn } from '~/services/Login/services';
import { ToastError } from '~/components/Toast';

export const handleSubmit = async (values) => {
    await usedPostSignIn(values); // call api to get token
    if (localStorage.getItem('token') === null) { // check if response contains token
        ToastError('Invalid username or password');
        return;
    }
}