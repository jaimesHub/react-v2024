import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);

    // updating UI after mounting UI & changing values
    // empty dependencies array is empty -> run once 
    useEffect(() => {
        console.log(">>> run useEffect >>>  111"); // run after
        loadUser();
    }, []);

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

        setDataUsers(res.data); // already change value -> rendering UI again using useEffect
    };

    // loadUser(); // mounting UI
    console.log(">>> run render >>> 000"); // run before 

    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    );
}

export default UserTable;