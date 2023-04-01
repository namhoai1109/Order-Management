import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';

import './shipper.scss';
import { COLUMNS_SHIPPER } from '../constColumn/const';


function Shipper() {
    const columns = COLUMNS_SHIPPER;
    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            name: "Trung",
            cmnd: "7777777777",
            phone: "0123456789",
            address: "Address 1",
            license: "456456456",
            area: "Quận 1",
            email: "trung@gmail.com",
            bank: "8888888888",
        },
        {
            id: 2,
            name: "Nam",
            cmnd: "11111111111",
            phone: "0321654987",
            address: "Address 2",
            license: "789789789",
            area: "Quận 4",
            email: "nam@gmail.com",
            bank: "77799988811",
        },


    ]);
    

    
    return (
        <div>
            <h1 className="page_container_title"> Shipper Page</h1>
            <Table columns={columns} dataSource={dataSource}></Table>
        </div>
    );
}

export default Shipper;