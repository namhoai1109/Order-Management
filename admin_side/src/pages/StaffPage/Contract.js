import { React, Fragment } from 'react';
import { Table, Skeleton } from 'antd';
import { COLUMNS_CONTRACT } from '../../constants/column_staff';
import useContract from './useContract';

function Contract() {
    const columns = COLUMNS_CONTRACT;
    const { data, isLoading } = useContract();
    return (
        <Fragment>
            <h1 className="page_container_title"> Contract Management Page</h1>
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

export default Contract;