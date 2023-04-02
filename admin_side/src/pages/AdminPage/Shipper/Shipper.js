import { React, useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import './shipper.scss';
import { COLUMNS_SHIPPER } from '../const/column';


function Shipper() {
    const columns = COLUMNS_SHIPPER;
    const [data, setData] = useState([]);

    // useEffect(() => {
    // axios.get(`${API_URL}/users`)
    //     .then(res => {
    //         const shippers = res.data.map(user => ({
    //             id: user.id,
    //             name: user.name,
    //             cmnd: `${user.address.zipcode}`,
    //             phone: user.phone,
    //             address: `${user.address.street}`,
    //             license: `${user.address.geo.lat}`,
    //             area: `${user.address.city}`,
    //             email: user.email,
    //             bank: `${user.address.zipcode}`,
    //         }));
    //         setData(shippers);
    //     })
    //     .catch(error => console.log(error));
    // }, []);


    return (
        <div>
            <h1 className="page_container_title"> Shipper Page</h1>
            <Table columns={columns} dataSource={data}></Table>
        </div>
    );
}

export default Shipper;