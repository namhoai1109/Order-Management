const COLUMNS = [
    {
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
        dataIndex: 'expriation_date',
        key: 'expriation_date',
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
        title: 'Time left',
        dataIndex: 'time',
        key: 'time',
    }
];

export {COLUMNS};
