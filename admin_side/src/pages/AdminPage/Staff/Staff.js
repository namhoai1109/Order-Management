import { React, useState, useEffect } from 'react';
import { Table } from 'antd';
import './staff.scss';
import { AddStaff } from '../../../components/Staff/staffComponent';
import { getAllStaff } from '../../../services/Admin/servicesAdmin';
import { COLUMNS_STAFF } from '../const/column';

function Staff() {
    const columns = COLUMNS_STAFF;
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllStaff(setData, localStorage.getItem('token'));       // get all staffs from database
    }, []);

    return (
        <div>
            <h1 className="page_container_title">Staff Page</h1>
            <AddStaff />
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
}

export default Staff;
