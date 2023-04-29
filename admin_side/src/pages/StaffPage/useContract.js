import { useState, useCallback } from 'react';
import { usedGetPartners } from '~/services/Staff/services';
import {formatDate} from '~/utils/formatDate';

const useContract = () =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    let getPartners = useCallback(async () => {
        let list = await usedGetPartners();
        let tmp = [];
    
        list.forEach((partner) => { 
            tmp.push({
                id: partner.id ?? <i>Chưa cập nhật</i>,
                contractId: partner.contractId ?? <i>Chưa cập nhật</i>,  
                name: partner.brandName ?? <i>Chưa cập nhật</i>,
                taxCode: partner.taxCode ?? <i>Chưa cập nhật</i>,
                quantity: partner.orderQuantity ?? <i>Chưa cập nhật</i>,
                representative: partner.representative ?? <i>Chưa cập nhật</i>,
                expiration_date: partner.contract?.expiredAt ?? <i>Chưa cập nhật</i>,
                bank: partner.contract?.bankAccount ?? <i>Chưa cập nhật</i>,
                culinaryStyle: partner.culinaryStyle ?? <i>Chưa cập nhật</i>,
                status: partner.status ?? <i>Chưa cập nhật</i>,
                createdAt: formatDate(partner.contract?.createdAt),
                confirmedAt: formatDate(partner.contract?.confirmedAt),
                expiredAt: formatDate(partner.contract?.expiredAt),
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
