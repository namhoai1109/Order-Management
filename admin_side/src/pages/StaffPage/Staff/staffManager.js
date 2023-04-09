import { React, useState } from 'react';
import { Table } from 'antd';
import { COLUMNS_CONTRACT } from './const/column';
import { useGetPartners } from '../../../services/Staff/services';


function StaffManager() {
    const columns = COLUMNS_CONTRACT;
    const [data, setData] = useState([]);

    useGetPartners(setData, localStorage.getItem('token'));
    return (
        <div>
            <h1 className="page_container_title"> Staff Manager Page</h1>
            <Table rowKey="id" dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
}

export default StaffManager;