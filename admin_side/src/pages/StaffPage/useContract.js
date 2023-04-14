import { useState, useCallback } from 'react';
import { usedGetPartners } from '~/services/Staff/services';

const useContract = () =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    let getPartners = useCallback(async () => {
        let list = await usedGetPartners();
        let tmp = [];
    
        list.forEach((partner) => { 
            tmp.push({
                id: partner.id,
                contractId: partner.contractId,
                name: partner.brandName,
                taxCode: partner.taxCode,
                quantity: partner.orderQuantity,
                representative: partner.representative,
                expiration_date: partner.contract?.expiredAt,
                bank: partner.contract?.bankAccount,
                culinaryStyle: partner.culinaryStyle,
                status: partner.status,
                createdAt: String(partner.contract?.createdAt),
                confirmedAt: String(partner.contract?.confirmedAt),
                expiredAt: String(partner.contract?.expiredAt),
            });
        });
        setData(tmp);
        setIsLoading(false);
        setDataLoaded(true);
    }, []);
    
    if (!dataLoaded) {
        getPartners();
    }

    return {
        data,
        isLoading,
    };
}
export default useContract;
