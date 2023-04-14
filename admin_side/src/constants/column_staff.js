import GenerateContract from '~/pages/StaffPage/components';
const COLUMNS_CONTRACT = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),

    }, {
        title: 'Tax code',
        dataIndex: 'taxCode',
        key: 'taxCode',
        sorter: (a, b) => a.taxCode.localeCompare(b.taxCode),

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
        title: 'Bank Account',
        dataIndex: 'bank',
        key: 'bank',
    },
    {
        title: 'Culinary Style',
        dataIndex: 'culinaryStyle',
        key: 'culinaryStyle',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Confirmed Date',
        dataIndex: 'confirmedAt',
        key: 'confirmedAt',
    },
    {
        title: 'Expiration date',
        dataIndex: 'expiration_date',
        key: 'expiration_date',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => GenerateContract(record)
    },

];

export { COLUMNS_CONTRACT };
