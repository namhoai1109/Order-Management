import { useState } from "react";
import { usedAddStaff } from "~/services/Admin/services";

const useAddStaff = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        name: ''
    });
    const [visible, setVisible] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleOk = async () => {
        const staff = { ...data };
        try {
            await usedAddStaff(staff);
            setVisible(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return {
        data,
        visible,
        setVisible,
        handleInputChange,
        handleOk
    };
};

export default useAddStaff;
