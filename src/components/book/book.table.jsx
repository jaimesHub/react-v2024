import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";

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

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    }


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table books</h3>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary">Create book
                </Button>
            </div>
            <Table
                dataSource={dataBooks}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        // onChange: (page, pageSize) => {
                        //     setCurrent(page);
                        //     setPageSize(pageSize);
                        // }
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} of {total} rows</div>) }
                    }}
                onChange={onChange}
            />

        </>
    );
}

export default BookTable;