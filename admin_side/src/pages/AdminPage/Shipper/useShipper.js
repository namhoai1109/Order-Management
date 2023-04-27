import { useState, useCallback } from "react";
import { usedGetShippers } from "~/services/Admin/services";

const useShipper = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    let getShippers = useCallback(async () => {
        let list = await usedGetShippers();
        let tmp = [];

        list.forEach((shippers) => {
            tmp.push({
                id: shippers.id ?? <i>Chưa cập nhật</i>,
                name: shippers.name ?? <i>Chưa cập nhật</i>,
                cmnd: shippers.account.nationalId ?? <i>Chưa cập nhật</i>,
                phone: shippers.account.phone ?? <i>Chưa cập nhật</i>,
                address: shippers.address ?? <i>Chưa cập nhật</i>,
                license: shippers.licensePlate ?? <i>Chưa cập nhật</i>,
                area: shippers.district.name ?? <i>Chưa cập nhật</i>,
                email: shippers.account.email ?? <i>Chưa cập nhật</i>,
                bank: shippers.account.bankAccount ?? <i>Chưa cập nhật</i>,
            });
        });
        setData(tmp);
        setIsLoading(false);
        setDataLoaded(true);
    }, []);

    if (!dataLoaded) {
        getShippers();
    }

    return {
        data,
        isLoading,
    };
}

export default useShipper;