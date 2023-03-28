import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';

import './shipper.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';

function Shipper() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            name: "Trung",
            cmnd: "7777777777",
            phone: "0123456789",
            address: "Address 1",
            license: "456456456",
            area: "Quận 1",
            email: "trung@gmail.com",
            bank: "8888888888",
        },
        {
            id: 2,
            name: "Nam",
            cmnd: "11111111111",
            phone: "0321654987",
            address: "Address 2",
            license: "789789789",
            area: "Quận 4",
            email: "nam@gmail.com",
            bank: "77799988811",
        },


    ]);
    const columns = [
        {
            key: "id",
            title: "ID",
            dataIndex: "id",
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),



        },
        {
            title: 'CMND',
            dataIndex: 'cmnd',
            key: 'cmnd',
            sorter: (a, b) => a.cmnd - b.cmnd,

        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',

        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',

        },
        {
            title: 'License plates',
            dataIndex: 'license',
            key: 'license',

        },
        {
            title: 'Active Area',
            dataIndex: 'area',
            key: 'area',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Bank account',
            dataIndex: 'bank',
            key: 'bank',

        },
        {
            key: "actions",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <Button onClick={() => {
                            onEditStudent(record);
                        }}
                            type="link"
                            className="admin_btnEdit"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>

                        <Button
                            onClick={() => {
                                onDeleteStudent(record);
                            }}
                            type="link"
                            className="admin_btnDelete"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const onAddStudent = () => {
        const randomNumber = parseInt(Math.random() * 100);
        const randomName = Math.random().toString(36).substring(7);

        const newStudent = {
            id: randomNumber,
            name: randomName,
            cmnd: parseInt(Math.random() * 10000),
            phone: parseInt(Math.random() * 10000),
            address: Math.random().toString(36).substring(7),
            license: parseInt(Math.random() * 100),
            area: "Quận " + parseInt(Math.random() * 10),
            email: parseInt(Math.random() * 100) + "@gmail.com",
            bank: parseInt(Math.random() * 1000000),
        };
        setDataSource((pre) => {
            return [...pre, newStudent];
        });
    };
    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this student record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((student) => student.id !== record.id);
                });
            },
        });
    };
    const onEditStudent = (record) => {
        setIsEditing(true);
        setEditingStudent({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingStudent(null);
    };
    return (
        <div>
            <h1 className="page_container_title"> Shipper Page</h1>
            <Button onClick={onAddStudent}>Add a new Student</Button>
            <Table columns={columns} dataSource={dataSource}></Table>
            <Modal
                title="Edit Student"
                visible={isEditing}
                okText="Save"
                onCancel={() => {
                    resetEditing();
                }}
                onOk={() => {
                    setDataSource((pre) => {
                        return pre.map((student) => {
                            if (student.id === editingStudent.id) {
                                return editingStudent;
                            } else {
                                return student;
                            }
                        });
                    });
                    resetEditing();
                }}
            >
                <Input
                    value={editingStudent?.name}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, name: e.target.value };
                        });
                    }}
                />

                <Input
                    value={editingStudent?.cmnd}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, cmnd: e.target.value };
                        });
                    }}
                />

                <Input
                    value={editingStudent?.phone}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, phone: e.target.value };
                        });
                    }}
                />

                <Input
                    value={editingStudent?.address}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, address: e.target.value };
                        });
                    }}
                />

                <Input
                    value={editingStudent?.license}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, license: e.target.value };
                        });
                    }}
                />

                <Input
                    value={editingStudent?.area}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, area: e.target.value };
                        });
                    }}
                />

                <Input
                    value={editingStudent?.email}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, email: e.target.value };
                        });
                    }}
                />

                <Input
                    value={editingStudent?.bank}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return { ...pre, bank: e.target.value };
                        });
                    }}
                />

            </Modal>
        </div>
    );
}

export default Shipper;