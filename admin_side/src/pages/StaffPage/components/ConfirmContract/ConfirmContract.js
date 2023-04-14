import React from "react";
import { Button } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import { usedPutContracts } from '~/services/Staff/services';

const ConfirmContract = (record) => {
    return (
        <div>
            <Button
                title='Confirm Contract'
                onClick={() => {
                    usedPutContracts(record.taxcode);
                }}
                type="link" className="admin_btnGenerate">
                <FileDoneOutlined />
            </Button>
        </div>
    );
}

export default ConfirmContract;
