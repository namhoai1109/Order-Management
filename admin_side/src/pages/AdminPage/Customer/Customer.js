import { React, useState, useCallback } from 'react';
import { Table, Spin } from 'antd';

import { COLUMNS_USER } from '../const/column';
import { usedGetCustomers } from '../../../services/Admin/services';

function Customer() {
    const columns = COLUMNS_USER;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    let getCustomers = useCallback(async () => {
        let list = await usedGetCustomers();
        let tmp = [];

        list.forEach((staff) => {
            if(staff.role === "customer")
            {
                tmp.push({
                    id: staff.id,
                    name: staff.username,
                    email: staff.email,
                    phone: staff.phone,
                    address: staff.address,
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
    return (
        <div>
            <h1 className="page_container_title"> Customer Page</h1>
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

export default Customer;