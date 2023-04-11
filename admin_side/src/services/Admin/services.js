import { deleteStaff, addStaff, getStaffs, getShippers, updateStatus, getPartners, getCustomers } from './callers';

export const usedDelelteStaff = async (id) => {
    try {
        const response = await deleteStaff(id);
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const usedAddStaff = async (staff) => {
    try {
        const response = await addStaff(staff);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const usedGetStaffs = async () => {
    try {
        const response = await getStaffs();
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const usedGetShippers = async () => {
    try {
        const response = await getShippers();
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const usedGetPartners = async () => {
    try {
        const response = await getPartners();
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const usedGetCustomers = async () => {
    try {
        const response = await getCustomers();
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const usedUpdateStatus = async (id) => {
    try {
        const response = await updateStatus(id);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}






