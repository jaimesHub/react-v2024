import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";

const BookTable = () => {
    let index = 0;
    const dataSource = [
        {
            key: '1',
            id: index + Math.random(),
            mainText: 'Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh',
            price: 80000,
            quantity: 1000,
            author: 'Ducan Bannatyne',
        },
        {
            key: '2',
            id: index + Math.random(),
            mainText: 'Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn',
            price: 70000,
            quantity: 1000,
            author: 'Jonathan Clements',
        },
    ];

    const columns = [
        {
            title: 'No',
            render: (_, record, index) => {
                return (
                    <>{index}</>
                );
            }
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: '_id',
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ cursor: 'pointer', color: 'orange' }} />
                    <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
                </Space>
            ),
        },
    ];


    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default BookTable;