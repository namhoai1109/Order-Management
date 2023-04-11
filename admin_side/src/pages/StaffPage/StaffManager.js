import { React, useState, useCallback } from 'react';
import { Table, Spin } from 'antd';
import { COLUMNS_CONTRACT } from './const/column';
import { usedGetPartners } from '~/services/Staff/services';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function StaffManager() {
    const columns = COLUMNS_CONTRACT;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    
    let getPartners = useCallback(async () => {
        let list = await usedGetPartners();
        let tmp = [];

        list.forEach((partner) => {
            tmp.push({
                id: partner.id,
                name: partner.brandName,
                taxcode: partner.taxCode,
                quantity: partner.orderQuantity,
                representative: partner.representative,
                expiration_date: partner.contract.expiredAt,
                bank: partner.contract.bankAccount,
                status: partner.status,
                culinaryStyle: partner.culinaryStyle,
            });
        });
        setData(tmp);
        setIsLoading(false);
        setDataLoaded(true);
    }, []);

    if (!dataLoaded) {
        getPartners();
    }

    return (
        <div>
            <h1 className="page_container_title"> Staff Manager Page</h1>
            {isLoading ? (
                <Spin size="large" tip="Loading..." />
            ) : (
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            )}
        </div>
    );
}

export default StaffManager;