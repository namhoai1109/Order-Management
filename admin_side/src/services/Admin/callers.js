import axios from '../../api/axios';
import {
    API_DELETE_STAFF,
    API_SIGN_UP_STAFF,
    API_GET_STAFFS,
    API_GET_ACCOUNTS,
    API_UPDATE_STATUS,
} from './api_paths';

export const deleteStaff = async (id) => {
    return await axios({
        method: 'DELETE',
        url: `${API_DELETE_STAFF}/${id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            withCredentials: true,
        },
    });
}

export const addStaff = async (staff, token) => {
    const { username, password, email, phone, name } = staff;

    return await axios({
        method: 'POST',
        url: API_SIGN_UP_STAFF,
        headers: {
            authorization: "Bearer " + token,
            withCredentials: true,

        },
        data: {
            username: username,
            password: password,
            email: email,
            phone: phone,
            name: name,
        }
    });
}

export const getStaffs = async (token) => {
    return await axios({
        method: 'GET',
        url: API_GET_STAFFS,
        headers: {
            authorization: "Bearer " + token,
            withCredentials: true,

        },
    });
}

export const getShippers = async (token) => {
    return await axios({
        method: 'GET',
        url: API_GET_ACCOUNTS,
        headers: {
            authorization: "Bearer " + token,
            withCredentials: true,

        }
    });
}

export const updateStatus = async (id) => {
    return await axios({
        method: 'POST',
        url: `${API_UPDATE_STATUS}/${id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            withCredentials: true,
        },
        data: {
            id: id,
        }
    });
}












