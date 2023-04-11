import { React, useState, useCallback } from 'react';
import { Table, Spin } from 'antd';

import './shipper.scss';
import { COLUMNS_SHIPPER } from '../../../constants/column_admin';
import { usedGetShippers } from '../../../services/Admin/services';

function Shipper() {
    const columns = COLUMNS_SHIPPER;
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

    return (
        <div>
            <h1 className="page_container_title"> Shipper Page</h1>
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

export default Shipper;