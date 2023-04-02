import axios from '../../../api/axios';

// delete staff when click button delete
const deleteStaff = async (id) => {
    try {
        const response = await axios.delete(`/users/${id}`);
        const { result, meta } = response.data;
        // handle success case
        console.log(`Staff with id ${id} has been deleted`);
    } catch (error) {
        // handle error case
        console.log(`Failed to delete staff with id ${id}: ${error.message}`);
    }
};


export { deleteStaff }


