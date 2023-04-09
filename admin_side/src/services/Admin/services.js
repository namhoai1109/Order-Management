import { deleteStaff, addStaff, getStaffs, getShippers, updateStatus, getPartners } from './callers';

export const AuseDelelteStaff = async (id) => {
    try {
        const response = await deleteStaff(id);
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};


export const useAddStaff = async (staff) => {
    try {
        const response = await addStaff(staff);
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};


export const useGetStaffs = async () => {
    try {
        const response = await getStaffs();
        const result = response.result;
        console.log('result', result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const useGetShippers = async () => {
    try {
        const response = await getShippers();
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const useGetPartners = async () => {
    try {
        const response = await getPartners();
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const AuseUpdateStatus = async (id) => {
    try {
        const response = await updateStatus(id);
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}






