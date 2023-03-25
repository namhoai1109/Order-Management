import { React, useState } from 'react';
import { Table } from 'antd';

import './partner.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';



function Partner() {

    const dataSource = [
        {
            key: '1',
            email: 'trung123@gmail.com',
            representative: 'Trung',
            restaurant: 'HighLand',
            phone: '0123456789',
            city: 'TP.HCM',
            bank: '123456789',
            btn_edit:
                <button onClick={() => { alert("Giao diện Edit") }} className="admin_btnEdit">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>,
            btn_block:
                <button onClick={() => { alert("Block partner") }} className="admin_btnBlock">
                    <FontAwesomeIcon icon={faLock} />
                </button>,
        },
        {
            key: '2',
            email: 'nam321@gmail.com',
            representative: 'Nam',
            restaurant: 'HighLand',
            phone: '0123456789',
            city: 'TP.HCM',
            bank: '123456789',
            btn_edit:
                <button onClick={() => { alert("Giao diện Edit") }} className="admin_btnEdit">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>,
            btn_block:
                <button onClick={() => { alert("Block partner") }} className="admin_btnBlock">
                    <FontAwesomeIcon icon={faLock} />
                </button>,
        },
    ];

    const columns = [
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
        },
        {
            title: '   ',
            dataIndex: 'btn_edit',
            key: 'btn_edit',
        },
        {
            title: '',
            dataIndex: 'btn_block',
            key: 'btn_block',
        }
    ];


    return (
        <div>
            <h1 className="partner_container_title"> Partner Page</h1>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default Partner;