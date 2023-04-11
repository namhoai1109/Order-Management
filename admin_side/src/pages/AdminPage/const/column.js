import React from 'react';
import { StaffAction } from '../Staff/actions';

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
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',

    },
];

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
        sorter: (a, b) => a.email.localeCompare(b.email),

    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone.localeCompare(b.phone),

    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => <StaffAction record={record} />,
    },
];

const COLUMNS_USER = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id.localeCompare(b.id),

    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),

    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),

    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone.localeCompare(b.phone),

    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        sorter: (a, b) => a.address.localeCompare(b.address),

    },
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

