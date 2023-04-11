import { React, Fragment } from 'react';
import { Table, Skeleton } from 'antd';
import { COLUMNS_CONTRACT } from '../../constants/column_staff';
import useStaffManager from './useStaffManager';


function StaffManager() {
    const columns = COLUMNS_CONTRACT;
    const { data, isLoading } = useStaffManager();
    return (
        <Fragment>
            <h1 className="page_container_title"> Staff Manager Page</h1>
            {isLoading ? (
                <Skeleton active />
            ) : (
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            )}
        </Fragment>
    );
}

export default StaffManager;