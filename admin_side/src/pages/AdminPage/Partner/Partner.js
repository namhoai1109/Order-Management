import { React, useState, useCallback } from 'react';
import { Table, Spin } from 'antd';

import './partner.scss';
import { COLUMNS_PARTNER } from '../../../constants/column_admin';
import { usedGetPartners } from '../../../services/Admin/services';


function Partner() {
    const columns = COLUMNS_PARTNER;
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


    return (
        <div>
            <h1 className="page_container_title"> Partner Page</h1>
            {isLoading ? (
                <Spin size="large" tip="Loading..." />
            ) : (
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            )}
        </div>
    );
}

export default Partner;