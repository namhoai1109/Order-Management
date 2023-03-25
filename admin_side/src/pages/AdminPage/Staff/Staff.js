import { React, useState } from 'react';
import { Table } from 'antd';

import './staff.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare, faPlug, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

function Staff() {
    const dataSource = [
        {
            key: '1',
            username: 'staff1',
            password: '123456',
            btn_edit:
                <button onClick={() => { alert("Giao diện Edit") }} className="admin_btnEdit">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>,

            btn_block:
                <button onClick={() => { alert("Block partner") }} className="admin_btnBlock">
                    <FontAwesomeIcon icon={faLock} />
                </button>,

            btn_delete:
                <button onClick={() => { alert("Delete partner") }} className="admin_btnDelete">
                    <FontAwesomeIcon icon={faTrash} />
                </button>,
        },
        {
            key: '2',
            username: 'staff2',
            password: '123456',
            btn_edit:
                <button onClick={() => { alert("Giao diện Edit") }} className="admin_btnEdit">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>,

            btn_block:
                <button onClick={() => { alert("Block partner") }} className="admin_btnBlock">
                    <FontAwesomeIcon icon={faLock} />
                </button>,

            btn_delete:
                <button onClick={() => { alert("Delete partner") }} className="admin_btnDelete">
                    <FontAwesomeIcon icon={faTrash} />
                </button>,
        },
    ];

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            // sort theo alphabet
            sorter: (a, b) => a.username.localeCompare(b.username),

        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '',
            dataIndex: 'btn_edit',
            key: 'btn_edit',
        },
        {
            title: '',
            dataIndex: 'btn_block',
            key: 'btn_block',
        },
        {
            title: '',
            dataIndex: 'btn_delete',
            key: 'btn_delete',
        }

    ];


    return (
        <div>
            <h1 className="partner_container_title"> Staff Page</h1>
            <button onClick={() => { alert("Giao diện Add") }} className="staff_add">
                <FontAwesomeIcon icon={faPlus} />
                Add Staff
            </button>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default Staff;