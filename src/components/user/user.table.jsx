import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateModalUser from './update.user.modal';
import { useState } from 'react';

const UserTable = (props) => {
    const { dataUsers } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'>{record._id}</a>
                );
            }
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: 'pointer', color: 'orange' }} />
                    <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
                </div>
            ),
        },
    ];

    // console.log(">>> check dataUpdate: ", dataUpdate);

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
            />
            <UpdateModalUser
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
}

export default UserTable;