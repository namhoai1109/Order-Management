import { React, Fragment } from 'react';
import { Table, Skeleton } from 'antd';
import './staff.scss';
import AddStaff from '~/pages/AdminPage/Staff/components/AddStaff/AddStaff';
import { COLUMNS_STAFF } from '../../../constants/column_admin';
import useStaff from './useStaff'

function Staff() {
    const columns = COLUMNS_STAFF;
    const { data, isLoading } = useStaff();

    return (
        <Fragment>
            <h1 className="page_container_title">Staff Page</h1>
            <AddStaff />
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

export default Staff;
