import { React, useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import './staff.scss';
import { AddStaff } from '../../../components/Staff/staffComponent';
import { COLUMNS_STAFF } from '../const/column';
import axios from '../../../api/axios';

function Staff() {
    const columns = COLUMNS_STAFF;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/admin/get-allStaff', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        withCredentials: true,
                    },
                });
                const result = response.data;
                const staffs = result.result.map(user => ({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                }));
                setData(staffs);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="page_container_title"> Staff Page</h1>
            <AddStaff />
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
}

export default Staff;
