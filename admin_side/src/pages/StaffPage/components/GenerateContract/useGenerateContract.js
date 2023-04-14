import { toast } from 'react-toastify';


const Notification = () =>{
    const notifyGenerated = () => {
        toast.success("Contract generated successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    
    const notifyConfirm = () => {
        toast.success("Contract confirmed successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return {
        notifyGenerated,
        notifyConfirm,
    };
}

export default Notification;