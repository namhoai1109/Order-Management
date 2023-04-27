import { useState } from 'react';
import { Modal } from "antd";
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { usedDelelteStaff, usedUpdateStatus } from '~/services/Admin/services';
import useStaff from '~/pages/AdminPage/Staff/useStaff';

const useActions = (record) => {
    const [iconBlock, setIconBlock] = useState(record.status === 'active' ? faLock : faLockOpen);
    const { data, setData } = useStaff();

    const handleUpdateStatus = (record) => {
        usedUpdateStatus(record.id)
            .then(() => {
                if (record.status === 'active') {
                    setIconBlock(faLockOpen);
                    data.forEach((staff) => {
                        if (staff.id === record.id) {
                            staff.status = 'inactive';
                        }
                    });
                    setData(data);

                } else {
                    setIconBlock(faLock);
                    data.forEach((staff) => {
                        if (staff.id === record.id) {
                            staff.status = 'active';
                        }
                    });
                    setData(data);
                }
                window.location.reload();
            });
    };

    const handleDeleteStaff = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this staff?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                usedDelelteStaff(record.id)
                .then(() => {
                    window.location.reload();
                });
            },
        });
    };

    return {
        iconBlock,
        handleUpdateStatus,
        handleDeleteStaff,
    }
}

export default useActions;
