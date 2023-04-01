import { React, useState, useEffect } from 'react';
import { Table} from 'antd';

import './partner.scss';
import { COLUMNS_PARTNER } from '../constColumn/const';




function Partner() {
    const columns = COLUMNS_PARTNER;
    const [dataSource, setDataSource] = useState([]);       // data source for table

    // get data from server
    useEffect(() => {
        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push({
                key: `${i}`,
                email: `Email ${i}`,
                representative: `Representative ${i}`,
                restaurant: `Restaurant ${i}`,
                phone: `Phone ${i}`,
                city: `City ${i}`,
                bank: `Bank ${i}`,
            })
        }
        setDataSource(data);
    }, [])

    return (
        <div>
            <h1 className="page_container_title"> Partner Page</h1>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default Partner;