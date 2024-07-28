import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useState } from 'react';

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    const loadUser = async () => {
        // console.log(">> run loadUser START");
        const res = await fetchAllUserAPI();
        // console.log(">> run loadUser END");
        // console.log("res: ", res.data);
        setDataUsers(res.data);
    };

    loadUser();
    console.log(">>> run render...");
    return (
        <Table columns={columns} dataSource={dataUsers} />
    );
}

export default UserTable;