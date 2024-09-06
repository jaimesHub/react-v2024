import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadBooks();
    }, [current, pageSize]);

    const loadBooks = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        // console.log('>> check res: ', res);

        if (res.data) {
            setDataBooks(res.data.result);
            setCurrent(+res.data.meta.current);
            setPageSize(+res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <BookTable
                dataBooks={dataBooks}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadBooks={loadBooks}
            />
        </div>
    )
}

export default BookPage;