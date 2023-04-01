import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';

import './staff.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLock, faPenToSquare, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';

import { COLUMNS_STAFF } from '../constColumn/const';

function Staff() {
    const columns = COLUMNS_STAFF;
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            key: `${i}`,
            username: `Username ${i}`,
            password: `Password ${i}`,
        })
    }


    return (
        <div>
            <h1 className="page_container_title"> Staff Page</h1>
            <Button onClick={() => { alert("Giao diện Add") }} className="staff_add">
                <FontAwesomeIcon icon={faPlus} />
                Add Staff
            </Button>
            <Table dataSource={data} columns={columns} />
        </div>
    );
}

export default Staff;