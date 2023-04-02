import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';


import './staff.scss';
import { COLUMNS_STAFF } from '../const/column';
import axios from '../../../api/axios';

function Staff() {
    const columns = COLUMNS_STAFF;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/users');
                const result = response.data;
                const staffs = result.map(user => ({
                    id: user.id,
                    username: user.username,
                    password: user.address.city,
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
            <Button onClick={() => { alert("Giao diện Add") }} className="staff_add">
                <FontAwesomeIcon icon={faPlus} />
                Add Staff
            </Button>
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
}

export default Staff;