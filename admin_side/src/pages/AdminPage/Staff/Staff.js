import { React, useState, useCallback } from 'react';
import { Table, Spin } from 'antd';
import './staff.scss';
import { AddStaff } from '~/components/Staff/staffComponent';
import { usedGetStaffs } from '~/services/Admin/services';
import { COLUMNS_STAFF } from '../../../constants/column_admin';

function Staff() {
    const columns = COLUMNS_STAFF;
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

    return (
        <div>
            <h1 className="page_container_title">Staff Page</h1>
            <AddStaff />
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

export default Staff;
