import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';

import './staff.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';

function Staff() {
    const [dataSource, setDataSource] = useState([]);       // data source for table
    const [lock, setLock] = useState(faLock);               // icon for block button
    const [editInfo, setEditInfo] = useState(null);        // edit info for table
    const [form] = Form.useForm();                         // form for table
    const [editMode, setEditMode] = useState(false);       // hide/show edit button - save button

    const toggle = () => {                            // toggle icon for block button   
        setLock(lock === faLock ? faLockOpen : faLock);
    }

    // get data from server
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


    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            render: (text, record) => {         // render name column
                if (editInfo === record.key) {
                    return <Form.Item
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }

        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: (text, record) => {         // render name column
                if (editInfo === record.key) {
                    return <Form.Item
                        name="password"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return (
                        <Form.Item>
                            <Button
                                type="link"
                                htmlType="submit"
                                className="admin_btnSave"
                            >
                                Save
                            </Button>
                        </Form.Item>
                    );
                }
                else {
                    return (
                        <>
                            <Button
                                type="link"
                                onClick={() => {
                                    setEditInfo(record.key);
                                    form.setFieldsValue({
                                        username: record.username,
                                        password: record.password,
                                    });
                                    setEditMode(!editMode); // toggle edit mode
                                }}
                                className="admin_btnEdit"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>

                            <Button type="link" onClick={toggle} className="admin_btnBlock">
                                <FontAwesomeIcon icon={lock} />
                            </Button>

                            <Button type="link" onClick={handleDelete} className="admin_btnDelete">
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </>
                    );
                }
            },
        }
    ];


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