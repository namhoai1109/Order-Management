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
            let count = 0;
            let branchAddress = [];
            partner.branches.forEach((branch) => {
                count++;
                branchAddress.push(branch.address + ', ' + branch.district.name);
                branchAddress.push(<br />);
            });

            tmp.push({
                name: partner.brandName ?? <i>Chưa cập nhật</i>,
                email: partner.account.email ?? <i>Chưa cập nhật</i>,
                phone: partner.account.phone ?? <i>Chưa cập nhật</i>,
                quantity: count ?? <i>Chưa cập nhật</i>,
                branchAddress: branchAddress ?? <i>Chưa cập nhật</i>,
                culinaryStyle: partner.culinaryStyle ?? <i>Chưa cập nhật</i>,
                status: partner.status ?? <i>Chưa cập nhật</i>,
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