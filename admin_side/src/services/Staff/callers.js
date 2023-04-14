import { get, post, put } from '~/utils/httpRequest';

import {
    API_GET_PARTNERS,
    API_GENERATE_CONTRACT,
    API_PUT_CONTRACTS
} from './api_paths';


export const getPartners = async () => {
    const response = await get(API_GET_PARTNERS);
    return response;
}

export const generateContract = async (taxCode) => {
    const response = await post(`${API_GENERATE_CONTRACT}/${taxCode}`);
    return response;
}

export const putContracts = async (taxCode) => {
    const response = await put(`${API_PUT_CONTRACTS}/${taxCode}`);
    return response;
}














