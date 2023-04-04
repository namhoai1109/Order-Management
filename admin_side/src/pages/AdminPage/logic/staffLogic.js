import axios from '../../../api/axios';
import { Modal } from 'antd';

// delete staff when click button delete
const deleteStaff = async (id) => {
    Modal.confirm({
        title: "Are you sure, you want to delete this staff record?",
        okText: "Yes",
        okType: "danger",
        onOk: async () => {
            try {
                const response = await axios.delete(`/users/${id}`);
                const { result, meta } = response.data;
                // handle success case
                console.log(`Staff with id ${id} has been deleted`);
            } catch (error) {
                // handle error case
                console.log(`Failed to delete staff with id ${id}: ${error.message}`);
            }
        },
    });

};

const addStaff = async (staff) => {
    const { username, password, email, phone, name } = staff;
    try {
        const response = await axios.post('/api/admin/register-staff', staff);
        const { result, meta } = response.data;
        // handle success case
        console.log(`Staff with username ${username} has been added`);
    } catch (error) {
        // handle error case
        console.log(`Failed to add staff with username ${username}: ${error.message}`);
    }
};






export { deleteStaff, addStaff }


