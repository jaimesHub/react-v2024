import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";

const BookTable = (props) => {
    const {
        dataBooks,
        loadBooks,
        current,
        pageSize,
        total,
        setCurrent,
        setPageSize
    } = props;

    const columns = [
        {
            title: 'No',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                );
            }
        },
        {
            title: 'Id',
            dataIndex: 'id',
            render: (_, record) => {
                console.log('>> check record: ', record);
                return (
                    <a href="#">
                        {record._id}
                    </a>
                );
            }
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
            <Table
                dataSource={dataBooks}
                columns={columns}
            />

        </>
    );
}

export default BookTable;