import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UpdateModalUser from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserApi } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleOnConfirm = async (user) => {
        const res = await deleteUserApi(user._id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete successfully!",
            });
            await loadUser();
        } else {
            notification.error({
                message: res.error,
                description: res.message,
            });
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >
                        {record._id}
                    </a>
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
                    <Popconfirm
                        title="Delete user"
                        description="Are you sure to delete this user ?"
                        onConfirm={() => handleOnConfirm(record)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
                    </Popconfirm>
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
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUser={loadUser}
            />
        </>
    );
}

export default UserTable;