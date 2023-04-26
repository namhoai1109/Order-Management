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
                    id: customer.id,
                    name: customer.username,
                    email: customer.email,
                    phone: customer.phone,
                    nationalId: customer.nationalId,
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