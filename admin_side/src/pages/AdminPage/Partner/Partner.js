import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button } from 'antd';

import './partner.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';




function Partner() {
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
                email: `Email ${i}`,
                representative: `Representative ${i}`,
                restaurant: `Restaurant ${i}`,
                phone: `Phone ${i}`,
                city: `City ${i}`,
                bank: `Bank ${i}`,
                
                
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

    
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            // sort theo alphabet
            sorter: (a, b) => a.email.localeCompare(b.email),
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }

        },
        {
            title: 'Representative',
            dataIndex: 'representative',
            key: 'representative',
            sorter: (a, b) => a.representative.localeCompare(b.representative),
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="representative"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }

        },
        {
            title: 'Restaurant',
            dataIndex: 'restaurant',
            key: 'restaurant',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="restaurant"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="phone"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Province/city',
            dataIndex: 'city',
            key: 'city',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="city"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Bank account',
            dataIndex: 'bank',
            key: 'bank',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="bank"
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
                                        email: record.email,
                                        representative: record.representative,
                                        restaurant: record.restaurant,
                                        phone: record.phone,
                                        city: record.city,
                                        bank: record.bank,
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
                        </>
                    );
                }
            },
        }
    ];


    return (
        <div>
            <h1 className="page_container_title"> Partner Page</h1>
            <Form form={form} onFinish={handleFinish}>
                <Table dataSource={dataSource} columns={columns} />
            </Form>
        </div>
    );
}

export default Partner;