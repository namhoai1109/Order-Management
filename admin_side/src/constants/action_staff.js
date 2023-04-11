import React from "react";
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { usedGenerateContract } from '~/services/Staff/services';

export const GenerateContract = (record) => {
    return (
        <div>
            <Button
                title='Generate Contract'
                onClick={() => {
                    usedGenerateContract(record.taxcode);
                }}
                type="link" className="admin_btnAddContract">
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </Button>
        </div>
    );
}
