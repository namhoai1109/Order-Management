import { getPartners, generateContract } from './callers';

export const usedGetPartners = async () => {
    try {
        const response = await getPartners();
        const result = response.result;
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const usedGenerateContract = async (taxCode) => {
    try {
        const response = await generateContract(taxCode);
        return response;
    } catch (error) {
        console.log(error);
    }
}


