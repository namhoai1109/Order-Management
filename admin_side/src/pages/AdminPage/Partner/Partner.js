import { React, Fragment } from 'react';
import { Table, Skeleton } from 'antd';

import './partner.scss';
import { COLUMNS_PARTNER } from '../../../constants/column_admin';
import usePartner from './usePartner';


function Partner() {
    const columns = COLUMNS_PARTNER;
    const { data, isLoading } = usePartner();

    return (
        <Fragment>
            <h1 className="page_container_title"> Partner Page</h1>
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

export default Partner;