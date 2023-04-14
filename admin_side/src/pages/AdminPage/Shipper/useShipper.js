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
                id: shippers.id,
                name: shippers.name,
                cmnd: shippers.nationalId,
                phone: shippers.phone,
                address: shippers.address,
                license: shippers.licensePlate,
                area: shippers.districtId,
                email: shippers.email,
                bank: shippers.bankAccount,
                status: shippers.status,
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