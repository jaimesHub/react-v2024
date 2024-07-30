import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateModalUser from './update.user.modal';
import { useState } from 'react';
import DetailUser from './view.user.detail';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDrawerDetailOpen, setIsDrawerDetailOpen] = useState(false);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a onClick={() => {
                        console.log("record:: ", record);
                        setDataDetail(record);
                        setIsDrawerDetailOpen(true);
                    }}>{record._id}</a>
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
    console.log(">>> check dataDetail: ", dataDetail)

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
                loadUser={loadUser}
            />
            <DetailUser
                isDrawerDetailOpen={isDrawerDetailOpen}
                setIsDrawerDetailOpen={setIsDrawerDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    );
}

export default UserTable;