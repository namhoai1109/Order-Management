import { Table } from 'antd';


function staffManager() {

    const dataSource = [
        {
            key: '1',
            taxcode: '111111111',
            quantity: '5',
            representative: 'Trung',
            expriation_date: '12/12/2025',
            bank: '123456789',
            status: 'Active',
            time: '5 days',

        },
        {
            key: '2',
            taxcode: '222222222',
            quantity: '3',
            representative: 'Nam',
            expriation_date: '12/12/2025',
            bank: '88888888',
            status: 'Active',
            time: '12 days',
        },
    ];

    const columns = [
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
    return (
        <div>
            <h1 className="partner_container_title"> Staff Manager Page</h1>
            <Table dataSource={dataSource} columns={columns} />

        </div>
    );
}

export default staffManager;