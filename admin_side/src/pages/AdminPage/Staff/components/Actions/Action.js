import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import useActions from './useActions';

const Action = ({ record }) => {
    const { iconBlock, handleUpdateStatus, handleDeleteStaff } = useActions(record);

    return (
        <div>
            <Button title='Block staff' onClick={() => {
                handleUpdateStatus(record)
            }} type="link" className="admin_btnBlock">
                <FontAwesomeIcon icon={iconBlock} />
            </Button>

            <Button title='Delete taff' onClick={() => {
                handleDeleteStaff(record)
            }} type="link" className="admin_btnDelete">
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    );
};

export default Action;