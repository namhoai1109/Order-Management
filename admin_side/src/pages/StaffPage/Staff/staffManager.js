import React from 'react';
import { Table } from 'antd';
import { COLUMNS } from './constColumn/const';
import { DATASOURCES } from './fakeData/data';




const columns = COLUMNS;
const dataSource = DATASOURCES;


function staffManager() {

    return (
        <div>
            <h1 className="page_container_title"> Staff Manager Page</h1>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />

        </div>
    );
}

export default staffManager;