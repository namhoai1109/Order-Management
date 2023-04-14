import React from "react";
import { Button } from 'antd';
import { FileAddOutlined, FileDoneOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { usedGenerateContract, usedPutContracts } from '~/services/Staff/services';
import Notification from './useGenerateContract';

const GenerateContract = (record) => {
    const { createdAt, confirmedAt, taxcode } = record;
    const { notifyGenerated, notifyConfirm } = Notification();

    if (createdAt === "undefined" && confirmedAt === "undefined") {
        return (
            <div>
                <Button
                    title='Generate Contract'
                    onClick={() => {
                        usedGenerateContract(taxcode);
                        notifyGenerated();
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
                        usedPutContracts(taxcode);
                        notifyConfirm();
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
