import { React, useState, useEffect } from 'react';
import { Table } from 'antd';

import { COLUMNS_PARTNER } from '../const/column';

function User() {
    const columns = COLUMNS_PARTNER;
    const [data, setData] = useState([]);

    // useEffect(() => {

    //     axios.get(`${API_URL}/users`)
    //         .then(res => {
    //             const partners = res.data.map(user => ({
    //                 key: user.id,
    //                 email: user.email,
    //                 representative: user.name,
    //                 restaurant: `Restaurant ${user.address.street}`,
    //                 phone: `Phone ${user.phone}`,
    //                 city: `City ${user.address.city}`,
    //                 bank: `Bank ${user.address.zipcode}`,
    //             }));
    //             setData(partners);
    //         })
    //         .catch(error => console.log(error));
    // }, []);

    return (
        <div>
            <h1 className="page_container_title"> User Page</h1>
            <Table dataSource={data} columns={columns} />
        </div>
    );
}

export default User;