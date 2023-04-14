import { React, Fragment } from 'react';
import { Table, Skeleton } from 'antd';

import './customer.scss';
import { COLUMNS_USER } from '../../../constants/column_admin';
import useCustomer from './useCustomer';

function Customer() {
    const columns = COLUMNS_USER;
    const { data, isLoading } = useCustomer();
    
    return (
        <Fragment>
            <h1 className="page_container_title"> Customer Page</h1>
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

export default Customer;