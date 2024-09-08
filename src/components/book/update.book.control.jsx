import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
    const {
        dataUpdate,
        setDataUpdate,
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        loadBook
    } = props;

    console.log(">>> dataUpdate: ", dataUpdate);
    console.log(">>> isModalUpdateOpen: ", isModalUpdateOpen);

    const [mainText, setMainText] = useState(dataUpdate ? dataUpdate.mainText : "");
    const [author, setAuthor] = useState(dataUpdate ? dataUpdate.author : "");
    const [price, setPrice] = useState(dataUpdate ? dataUpdate.price : "");
    const [quantity, setQuantity] = useState(dataUpdate ? dataUpdate.quantity : "");
    const [category, setCategory] = useState(dataUpdate ? dataUpdate.category : "");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);

            setPreview(`
                ${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}
            `);
        }
    }, [dataUpdate]);

    const handleOk = async () => {
        console.log(">>> data will be updated: ", mainText, author, price, quantity, category, selectedFile, preview)

        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "You have to upload a image!"
            });

            setDataUpdate(null);
            setIsModalUpdateOpen(false);

            return;
        }

        if (preview && !selectedFile) {
            notification.error({
                message: "Error update book",
                description: "There is no upload file!"
            });

            setDataUpdate(null);
            setIsModalUpdateOpen(false);

            return;
        }

        if (preview && selectedFile) {
            console.log(">>> preview: ", preview);
            console.log(">>> selectedFile: ", selectedFile);

            // upload file api
            const resUpload = await handleUploadFile(selectedFile, "book");

            // update book
            if (resUpload.data) {
                //success
                const newThumbnail = resUpload.data.fileUploaded;
                //step 2: update book
                const resBook = await updateBookAPI(
                    dataUpdate._id,
                    newThumbnail,
                    mainText,
                    author,
                    price,
                    quantity,
                    category
                );

                if (resBook.data) {
                    resetAndCloseModal();

                    await loadBook();

                    notification.success({
                        message: "Update book",
                        description: "Update successfully!"
                    })

                } else {
                    notification.error({
                        message: "Error update book",
                        description: JSON.stringify(resBook.message)
                    })
                }
            } else {
                //failed
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                });
            }
        }


    }

    const handleCancel = () => {
        resetAndCloseModal();
    }

    const handleOnChangeFile = (e) => {
        console.log(">>> e:: ", e);

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }

        // console.log(">>> check file: ", file);
    }

    const resetAndCloseModal = () => {
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }

    return (
        <>
            <Modal title="Update book"
                open={isModalUpdateOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="UPDATE"
                maskClosable={true}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Title</span>
                        <Input
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Author</span>
                        <Input
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}
                        />
                    </div>
                    <div>
                        <div>Price</div>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' đ'}
                            value={price}
                            onChange={(event) => { setPrice(event) }}
                        />
                    </div>
                    <div>
                        <div>Quantity</div>
                        <InputNumber
                            style={{ width: "100%" }}
                            value={quantity}
                            onChange={(event) => { setQuantity(event) }}
                        />
                    </div>

                    <div>
                        <div>Category</div>
                        <Select
                            style={{ width: "100%" }}
                            value={category}
                            onChange={(value) => { setCategory(value) }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </div>
                    <div>
                        <div>Thumbnail Image</div>
                        <div>
                            <label htmlFor='btnUpload' style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                Upload
                            </label>
                            <input
                                type='file' hidden id='btnUpload'
                                onChange={(event) => handleOnChangeFile(event)}
                            // onClick={(event) => event.target.value = null}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "15px",
                                    height: "100px", width: "150px",
                                }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UpdateBookControl;