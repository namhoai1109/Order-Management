import { React, useState } from 'react';
import { Table } from 'antd';
import './staff.scss';
import { AddStaff } from '../../../components/Staff/staffComponent';
import { useGetStaffs } from '../../../services/Admin/services';
import { COLUMNS_STAFF } from '../const/column';

function Staff() {
    const columns = COLUMNS_STAFF;
    const [data, setData] = useState([]);
    
    useGetStaffs(setData, localStorage.getItem('token'));       // get all staffs from database

    return (
        <div>
            <h1 className="page_container_title">Staff Page</h1>
            <AddStaff />
            <Table rowKey="id" dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
}

export default Staff;
