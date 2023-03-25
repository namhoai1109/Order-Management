import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button } from 'antd';

import './shipper.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';



function Shipper() {
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
                name: `Name ${i}`,
                cmnd: `CMND ${i}`,
                phone: `Phone ${i}`,
                address: `Address ${i}`,
                license: `License ${i}`,
                area: `Area ${i}`,
                mail: `Mail ${i}`,
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record) => {         // render name column
                if (editInfo === record.key) {
                    return <Form.Item
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }

        },
        {
            title: 'CMND',
            dataIndex: 'cmnd',
            key: 'cmnd',
            sorter: (a, b) => a.cmnd - b.cmnd,
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="cmnd"
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
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="address"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'License plates',
            dataIndex: 'license',
            key: 'license',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="license"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Active Area',
            dataIndex: 'area',
            key: 'area',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="area"
                    >
                        <Input />
                    </Form.Item>
                } else {
                    return <p>{text}</p>
                }
            }
        },
        {
            title: 'Email',
            dataIndex: 'mail',
            key: 'mail',
            render: (text, record) => {
                if (editInfo === record.key) {
                    return <Form.Item
                        name="mail"
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
                                        name: record.name,
                                        cmnd: record.cmnd,
                                        phone: record.phone,
                                        address: record.address,
                                        license: record.license,
                                        area: record.area,
                                        mail: record.mail,
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

                            <Button type="link" className="admin_btnDelete">
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </>
                    );
                }
            },
        },

    ];

    return (
        <div>
            <h1 className="partner_container_title"> Shipper Page</h1>


            <Form form={form} onFinish={handleFinish}>
                <Table dataSource={dataSource} columns={columns} />
            </Form>


        </div>
    );
}

export default Shipper;