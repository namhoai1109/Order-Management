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
                id: staff.id ?? <i>Chưa cập nhật</i>,
                username: staff.username ?? <i>Chưa cập nhật</i>,
                email: staff.email ?? <i>Chưa cập nhật</i>,
                phone: staff.phone ?? <i>Chưa cập nhật</i>,
                status: staff.status ?? <i>Chưa cập nhật</i>,
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