import React from 'react';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { useGenerateContract } from '~/services/Staff/services';

const COLUMNS_CONTRACT = [
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
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => {

            return (
                <div>
                    <Button
                        onClick={() => {
                            useGenerateContract(localStorage.getItem('token'), record.taxcode);
                        }}
                        type="link" className="admin_btnBlock">
                        <FontAwesomeIcon icon={faFileContract} />
                    </Button>
                </div>
            );
        },
    },

];

export { COLUMNS_CONTRACT };
