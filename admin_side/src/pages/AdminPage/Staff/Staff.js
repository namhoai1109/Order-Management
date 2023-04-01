import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';

import './staff.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';

import { COLUMNS_STAFF } from '../constColumn/const';

function Staff() {
    const columns = COLUMNS_STAFF;
    const [dataSource, setDataSource] = useState([]);       // data source for table
    const [lock, setLock] = useState(faLock);               // icon for block button
    const [editInfo, setEditInfo] = useState(null);        // edit info for table
    const [form] = Form.useForm();                         // form for table
    const [editMode, setEditMode] = useState(false);       // hide/show edit button - save button



    useEffect(() => {
        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push({
                key: `${i}`,
                username: `Username ${i}`,
                password: `Password ${i}`,
                
            })
        }
        setDataSource(data);
    }, [])

    const handleFinish = (values) => {
        const newData = [...dataSource];
        newData.splice(editInfo, 1, { ...values, key: editInfo });
        setDataSource(newData);
        setEditInfo(null);
    };

    const handleDelete = (record) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => record.key === item.key);
        newData.splice(index, 1);
        setDataSource(newData);
      };

    return (
        <div>
            <h1 className="page_container_title"> Staff Page</h1>
            <Button onClick={() => { alert("Giao diện Add") }} className="staff_add">
                <FontAwesomeIcon icon={faPlus} />
                Add Staff
            </Button>
            <Form form={form} onFinish={handleFinish}>
                <Table dataSource={dataSource} columns={columns} />
            </Form>
        </div>
    );
}

export default Staff;