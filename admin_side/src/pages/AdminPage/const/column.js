import React, { useState } from 'react';
import { faLock, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from 'antd';
import { AuseDelelteStaff, AuseUpdateStatus } from '~/services/Admin/services';

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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),

    }, {
        title: 'Tax code',
        dataIndex: 'taxcode',
        key: 'taxcode',
        // sort theo alphabet
        sorter: (a, b) => a.taxcode.localeCompare(b.taxcode),

    },
    {
        title: 'Quatity of branch',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity.localeCompare(b.quantity),

    },
    {
        title: 'Representative',
        dataIndex: 'representative',
        key: 'representative',
        sorter: (a, b) => a.representative.localeCompare(b.representative),

    },
    {
        title: 'Expiration date',
        dataIndex: 'expiration_date',
        key: 'expiration_date',
    },
    {
        title: 'Bank Account',
        dataIndex: 'bank',
        key: 'bank',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Culinary Style',
        dataIndex: 'culinaryStyle',
        key: 'culinaryStyle',
    }
];

const StaffActions = ({ record }) => {
    const [iconBlock, setIconBlock] = useState();
    if (record.status === 'active') {
        setIconBlock(faLockOpen);
    } else {
        setIconBlock(faLock);
    }

    const handleUpdateStatus = () => {
        AuseUpdateStatus(record.id, localStorage.getItem('token'))
            .then(() => {
                if (record.status === 'active') {
                    setIconBlock(faLock);
                } else {
                    setIconBlock(faLockOpen);
                }
            });
    };

    const handleDeleteStaff = () => {
        Modal.confirm({
            title: "Are you sure, you want to delete this staff record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                AuseDelelteStaff(record.id)
            },
        });
    };

    return (
        <div>
            <Button
                onClick={handleUpdateStatus}
                type="link" className="admin_btnBlock">
                <FontAwesomeIcon icon={iconBlock} />
            </Button>

            <Button
                onClick={handleDeleteStaff}
                type="link" className="admin_btnDelete">
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    );
};

const COLUMNS_STAFF = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),

    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => <StaffActions record={record} />,
    },
];


// const COLUMNS_STAFF = [
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'id',
//         sorter: (a, b) => a.username.localeCompare(b.username),

//     },
//     {
//         title: 'Username',
//         dataIndex: 'username',
//         key: 'username',
//         sorter: (a, b) => a.username.localeCompare(b.username),

//     },
//     {
//         title: 'Password',
//         dataIndex: 'password',
//         key: 'password',
//     },
//     {
//         title: 'Actions',
//         key: 'actions',
//         render: (text, record) => {
//             const [iconBlock, setIconBlock] = useState(faLock);

//             useEffect(() => {
//                 if (record.status === 'active') {
//                     setIconBlock(faLockOpen);
//                 } else {
//                     setIconBlock(faLock);
//                 }
//             }, [record.status]);

//             return (
//                 <div>
//                     <Button
//                         onClick={() => {
//                             useUpdateStatus(record.id, localStorage.getItem('token'))
//                             .then(() => {
//                                 if (record.status === 'active') {
//                                     setIconBlock(faLock);
//                                 } else {
//                                     setIconBlock(faLockOpen);
//                                 }
//                             });
//                         }}
//                         type="link" className="admin_btnBlock">
//                         <FontAwesomeIcon icon={faLock} />
//                     </Button>

//                     <Button
//                         onClick={() => {
//                             Modal.confirm({
//                                 title: "Are you sure, you want to delete this staff record?",
//                                 okText: "Yes",
//                                 okType: "danger",
//                                 onOk: () => { 
//                                     AuseDelelteStaff(record.id) 
//                                 },
//                             });
//                         }}
//                         type="link" className="admin_btnDelete">
//                         <FontAwesomeIcon icon={faTrash} />
//                     </Button>
//                 </div>
//             );
//         },
//     },
// ];

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

const DATASOURCES = [
    {
        key: '1',
        username: 'Trung',
        password: '123',

    },
    {
        key: '2',
        username: 'Trung1',
        password: '123',
    },
    {
        key: '3',
        username: 'Trung2',
        password: '123',
    },
    {
        key: '4',
        username: 'Trung3',
        password: '123',
    },

];


export { COLUMNS_SHIPPER, COLUMNS_PARTNER, COLUMNS_STAFF, COLUMNS_USER, DATASOURCES }

