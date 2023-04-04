import { faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { deleteStaff } from '~/services/Admin/servicesAdmin';


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
        title: 'Id',
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
                <Button type="link" className="admin_btnBlock">
                    <FontAwesomeIcon icon={faLock} />
                </Button>

                <Button
                    onClick={() => { deleteStaff(record.id) }}
                 type="link" lassName="admin_btnDelete">
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

