import { React, Fragment } from 'react';
import { Table, Skeleton } from 'antd';

import './shipper.scss';
import { COLUMNS_SHIPPER } from '../../../constants/column_admin';
import useShipper from './useShipper'

function Shipper() {
    const columns = COLUMNS_SHIPPER;
    const { data, isLoading } = useShipper();

    return (
        <Fragment>
            <h1 className="page_container_title"> Shipper Page</h1>
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

export default Shipper;