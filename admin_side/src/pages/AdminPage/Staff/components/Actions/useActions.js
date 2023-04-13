import { useState } from 'react';
import { Modal } from "antd";
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { usedDelelteStaff, usedUpdateStatus } from '~/services/Admin/services';

const useActions = (record) => {
    const [iconBlock, setIconBlock] = useState(record.status === 'active' ? faLockOpen : faLock);

    const handleUpdateStatus = (record) => {
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

    const handleDeleteStaff = (record) => {
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

    return {
        iconBlock,
        handleUpdateStatus,
        handleDeleteStaff
    }
}

export default useActions;
