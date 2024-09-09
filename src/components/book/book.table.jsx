import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service";
import BookDetail from "./book.detail";
import CreateBookUncontrol from "./create.book.uncontrol";
// import UpdateBookControl from "./update.book.control";
import CreateBookControl from "./create.book.control";
import UpdateBookUncontrol from "./update.book.uncontrol";

const BookTable = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [loadingTable, setLoadingTable] = useState(false);

    const loadBook = useCallback(async () => {
        setLoadingTable(true);

        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }

        setLoadingTable(false);
    }, [current, pageSize])

    useEffect(() => {
        loadBook();
    }, [loadBook]);

    const handleDeleteBook = async (book) => {
        const res = await deleteBookAPI(book._id);

        if (res.data) {
            notification.success({
                message: "Delete Book",
                description: "Delete successfully!",
            });

            await loadBook();
        } else {
            notification.error({
                message: res.error,
                description: res.message,
            });
        }
    }

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
    };

    const columns = [
        {
            title: "No",
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                );
            }
        },

        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(text)

            },
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
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }}
                    />
                    <Popconfirm
                        title="Delete this book ?"
                        description="Are you sure you want to delete this book ?"
                        onConfirm={() => handleDeleteBook(record)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{
                margin: "10px 0",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>Create Book</Button>
            </div>

            <Table
                columns={columns}
                dataSource={dataBook}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} on {total} rows</div>) }
                    }
                }
                onChange={onChange}
                loading={loadingTable}
            />

            <BookDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />

            {/* <CreateBookControl
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            /> */}

            <CreateBookUncontrol
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            />

            {/* <UpdateBookControl
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                loadBook={loadBook}
            /> */}

            <UpdateBookUncontrol
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                loadBook={loadBook}
            />
        </>
    )
}

export default BookTable;