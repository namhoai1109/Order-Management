import { toast } from 'react-toastify';
import { Modal } from 'antd';
import { usedGenerateContract, usedPutContracts } from '~/services/Staff/services';


export const Notification = (taxcode) => {
    const notifyGenerated = () => {
        Modal.confirm({
            title: "Are you sure, you want to Create Contract?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                usedGenerateContract(taxcode);
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
            },
        });

    }

    const notifyConfirm = (taxcode) => {
        Modal.confirm({
            title: "Are you sure, you want to Confirm Contract?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                usedPutContracts(taxcode);
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
            },
        });

    }

    return {
        notifyGenerated,
        notifyConfirm,
    };
}

