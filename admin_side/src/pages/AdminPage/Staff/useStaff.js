import { useState, useCallback } from 'react';
import { usedGetStaffs } from '~/services/Admin/services';

const useStaff = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    let getStaffs = useCallback(async () => {
        let list = await usedGetStaffs();
        let tmp = [];

        list.forEach((staff) => {
            tmp.push({
                id: staff.id,
                username: staff.username,
                email: staff.email,
                phone: staff.phone,
                status: staff.status,
            });
        });
        setData(tmp);
        setIsLoading(false);
        setDataLoaded(true);
    }, []);

    if (!dataLoaded) {
        getStaffs();
    }

    return {
        data,
        setData,
        isLoading,
    };
};

export default useStaff;