import React, { useState } from 'react';
import { faLock, faTrash, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from 'antd';
import { usedDelelteStaff, usedUpdateStatus } from '~/services/Admin/services';

export const StaffAction = ({ record }) => {
    const [iconBlock, setIconBlock] = useState(record.status === 'active' ? faLockOpen : faLock);

    const handleUpdateStatus = () => {
        usedUpdateStatus(record.id)
            .then(() => {
                if (record.status === 'active') {
                    setIconBlock(faLock);
                } else {
                    setIconBlock(faLockOpen);
                }
                window.location.reload();
            });      
    };

    const handleDeleteStaff = () => {
        Modal.confirm({
            title: "Are you sure, you want to delete this staff record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                usedDelelteStaff(record.id);
            },
        });
        window.location.reload();
    };

    return (
        <div>
            <Button title='Block staff'  onClick={handleUpdateStatus} type="link" className="admin_btnBlock">
                <FontAwesomeIcon icon={iconBlock} />
            </Button>

            <Button title='Delete taff' onClick={handleDeleteStaff} type="link" className="admin_btnDelete">
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    );
};
