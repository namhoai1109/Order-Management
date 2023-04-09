import { get, post, postForm, _delete } from '~/utils/httpRequest';

import {
    API_DELETE_STAFF,
    API_SIGN_UP_STAFF,
    API_UPDATE_STATUS,
    API_GET_STAFFS,
    API_GET_ACCOUNTS,
    API_GET_PARTNERS,
    API_GET_SHIPPERS,
} from './api_paths';

export const deleteStaff = async (id) => {
    const response = await _delete(`${API_DELETE_STAFF}/${id}`);
    return response;
}

export const addStaff = async (staff) => {
    const { username, password, email, phone, name } = staff;

    const response = await postForm(API_SIGN_UP_STAFF, {
        username: username,
        password: password,
        email: email,
        phone: phone,
        name: name,
    });
    return response;
}

export const getStaffs = async () => {
    const response = await get(API_GET_STAFFS);
    return response;
}

export const getShippers = async () => {
    const response = await get(API_GET_SHIPPERS);
    return response;
}


export const getPartners = async () => {
    const response = await get(API_GET_PARTNERS);
    return response;
}


export const updateStatus = async (id) => {
    const response = await post(API_UPDATE_STATUS, {
        id: id,
    });
    return response;
}












