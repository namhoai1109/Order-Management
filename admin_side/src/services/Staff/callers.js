import { get, post } from '~/utils/httpRequest';

import {
    API_GET_PARTNERS,
    API_GENERATE_CONTRACT,
} from './api_paths';


export const getPartners = async () => {
    const response = await get(API_GET_PARTNERS);
    return response;
}

export const generateContract = async (taxCode) => {
    const response = await post(`${API_GENERATE_CONTRACT}/${taxCode}`);
    return response;
}














