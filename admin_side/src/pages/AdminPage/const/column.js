import React from 'react';
import { faLock, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from 'antd';
import { AuseDelelteStaff, useUpdateStatus } from '~/services/Admin/services';


const COLUMNS_SHIPPER = [
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
]

const COLUMNS_PARTNER = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        // sort theo alphabet
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: 'Representative',
        dataIndex: 'representative',
        key: 'representative',
        sorter: (a, b) => a.representative.localeCompare(b.representative),
    },
    {
        title: 'Restaurant',
        dataIndex: 'restaurant',
        key: 'restaurant',

    },
    {
        title: 'Phone number',
        dataIndex: 'phone',
        key: 'phone',

    },
    {
        title: 'Province/city',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'Bank account',
        dataIndex: 'bank',
        key: 'bank',
    }

];

const COLUMNS_STAFF = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.username.localeCompare(b.username),

    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),

    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <div>
                <Button
                    onClick={() => {
                        useUpdateStatus(record.id, localStorage.getItem('token'));
                    }}
                    type="link" className="admin_btnBlock">
                    <FontAwesomeIcon icon={faLock} />
                </Button>

                <Button
                    onClick={() => {
                        Modal.confirm({
                            title: "Are you sure, you want to delete this staff record?",
                            okText: "Yes",
                            okType: "danger",
                            onOk: () => { 
                                AuseDelelteStaff(record.id) 
                            },
                        });
                    }}
                    type="link" className="admin_btnDelete">
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </div>
        )
    },
];

const COLUMNS_USER = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),

    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
    }
];


export { COLUMNS_SHIPPER, COLUMNS_PARTNER, COLUMNS_STAFF, COLUMNS_USER }

