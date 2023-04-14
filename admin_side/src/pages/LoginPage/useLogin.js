import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usedPostSignIn } from '~/services/Login/services';

export const handleSubmit = async (values) => {
    await usedPostSignIn(values); // call api to get token
    if (localStorage.getItem('token') === null) { // check if response contains token
        toast.error("Invalid username or password", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        return;
    }
}