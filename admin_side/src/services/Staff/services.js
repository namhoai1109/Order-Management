import { getPartners, generateContract } from './callers';

export const useGetPartners = async (setData, token) => {
    try {
        const response = await getPartners(token);
        const result = response.data;
        const partners = result.result.map(partner => ({
            id: partner.id,
            name: partner.brandName,
            taxcode: partner.taxCode,
            quantity: partner.orderQuantity,
            representative: partner.representative,
            expiration_date: partner.contract?.expireAt,
            bank: partner.account.bankAccount,
            status: partner.status,
            culinaryStyle: partner.culinaryStyle
        }));
        setData(partners);
    } catch (error) {
        console.log(error);
    }
};

export const useGenerateContract = async (token, taxCode) => {
    try {
        const response = await generateContract(token, taxCode);
        const result = response.data;
        if (result.status === "success") {
            console.log(`Contract with tax code ${taxCode} has been generated`);
        } else {
            console.log(`Failed to generate contract with tax code ${taxCode}`);
        }
    } catch (error) {
        console.log(error);
    }
}


