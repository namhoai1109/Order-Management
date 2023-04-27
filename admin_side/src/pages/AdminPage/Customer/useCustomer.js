import { useState, useCallback } from 'react';
import { usedGetCustomers } from '~/services/Admin/services';


const useCustomer = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    let getCustomers = useCallback(async () => {
        let list = await usedGetCustomers();
        let tmp = [];

        list.forEach((customer) => {
            if (customer.role === "customer") {
                tmp.push({
                    id: customer.id ?? <i>Chưa cập nhật</i>,
                    name: customer.username ?? <i>Chưa cập nhật</i>,
                    email: customer.email ?? <i>Chưa cập nhật</i>,
                    phone: customer.phone ?? <i>Chưa cập nhật</i>,
                    nationalId: customer.nationalId ?? <i>Chưa cập nhật</i>,
                });
            }
        });
        setData(tmp);
        setIsLoading(false);
        setDataLoaded(true);
    }, []);

    if (!dataLoaded) {
        getCustomers();
    }

    return {
        data,
        isLoading,
    };

}

export default useCustomer;