import { React, useState } from 'react';
import { Table } from 'antd';

import './partner.scss';
import { COLUMNS_PARTNER } from '../const/column';
import { useGetPartners } from '../../../services/Admin/services';


function Partner() {
    const columns = COLUMNS_PARTNER;
    const [data, setData] = useState([]);

    useGetPartners(setData, localStorage.getItem('token'));


    return (
        <div>
            <h1 className="page_container_title"> Partner Page</h1>
            <Table dataSource={data} columns={columns} />
        </div>
    );
}

export default Partner;