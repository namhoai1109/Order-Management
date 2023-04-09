import { React, useState, useEffect } from 'react';
import { Table, Spin } from 'antd';
import './staff.scss';
import { AddStaff } from '../../../components/Staff/staffComponent';
import { useGetStaffs } from '../../../services/Admin/services';
import { COLUMNS_STAFF } from '../const/column';

function Staff() {
    const columns = COLUMNS_STAFF;
    const [dataTable, setDataTable] = useState();
    const { data, isLoading } = useGetStaffs();

    
    

    return (
        <div>
            <h1 className="page_container_title">Staff Page</h1>
            <AddStaff />
            <Spin size='large' spinning={isLoading} tip="Loading...">
                {data && (
                    <Table
                        rowKey="id"
                        dataSource={dataTable}
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                    />
                )}
            </Spin>
        </div>
    );
}

export default Staff;
