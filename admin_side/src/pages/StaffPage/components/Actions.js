import React from "react";
import { Button } from 'antd';
import { FileAddOutlined, FileDoneOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Notification } from './useActions';

const GenerateContract = (record) => {
    const { createdAt, confirmedAt, taxCode } = record;
    const { notifyGenerated, notifyConfirm } = Notification();

    if (createdAt === "") {
        return (
            <div>
                <Button
                    title='Generate Contract'
                    onClick={() => {
                        notifyGenerated(taxCode);
                    }}
                    type="link" className="admin_btnAddContract">
                    <FileAddOutlined />
                </Button>
            </div>
        );
    } else if (createdAt && confirmedAt === "null") {
        return (
            <div>
                <Button
                    title='Confirm Contract'
                    onClick={() => {
                        notifyConfirm(taxCode);
                    }}
                    type="link" className="admin_btnConfirm">
                    <FileDoneOutlined />
                </Button>
            </div>
        );
    }
    <ToastContainer />
    return null;
}

export default GenerateContract;
