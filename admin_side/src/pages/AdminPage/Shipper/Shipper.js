import { React, useState, useEffect } from 'react';
import { Table } from 'antd';
import './shipper.scss';
import { COLUMNS_SHIPPER } from '../const/column';
import { getAllShipper } from '../../../services/Admin/servicesAdmin';



function Shipper() {
    const columns = COLUMNS_SHIPPER;
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllShipper(setData, localStorage.getItem('token'));       // get all staffs from database
    }, []);


    return (
        <div>
            <h1 className="page_container_title"> Shipper Page</h1>
            <Table columns={columns} dataSource={data}></Table>
        </div>
    );
}

export default Shipper;