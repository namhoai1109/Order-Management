import { useState, useCallback } from 'react';
import { usedGetPartners } from '~/services/Admin/services';

const usePartner = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    let getPartners = useCallback(async () => {
        let list = await usedGetPartners();
        let tmp = [];

        list.forEach((partner) => {
            tmp.push({
                name: partner.brandName,
                taxcode: partner.taxCode,
                quantity: partner.orderQuantity,
                representative: partner.representative,
                expiration_date: partner.contract.expiredAt,
                bank: partner.contract.bankAccount,
                status: partner.status,
                culinaryStyle: partner.culinaryStyle,
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

export default usePartner;