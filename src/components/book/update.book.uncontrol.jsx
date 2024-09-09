import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookUncontrol = (props) => {
    const {
        dataUpdate,
        setDataUpdate,
        loadBook,
        isModalUpdateOpen,
        setIsModalUpdateOpen
    } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [form] = Form.useForm();

    const handleSubmitBtn = async (values) => {
        //không có ảnh preview + không có file upload => return
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Please upload a thumbnail image!"
            });

            return;
        }

        let newThumbnail = "";
        //có ảnh preview và không có file upload => không upload file
        if (!selectedFile && preview) {
            //do nothing
            newThumbnail = dataUpdate.thumbnail;
        } else {
            //có ảnh preview và có file => upload file
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                //failed
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        }

        //step 2: update book
        await updateBook(newThumbnail, values);
    }

    const handleOnChangeFile = (event) => {

        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }


    const resetAndCloseModal = () => {
        form.resetFields();

        setSelectedFile(null);
        setPreview(null);
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await updateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category
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
    }

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            });

            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate]);

    return (
        <Modal
            title="Update Book"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"UPDATE"}
        >
            <Form
                form={form}
                onFinish={handleSubmitBtn}
                layout="vertical"
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>

                    <div>
                        <Form.Item
                            label="ID"
                            name="id"
                        >
                            <Input disabled />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            label="Title"
                            name="mainText"
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: 'Author is required!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Price is required!',
                                }
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                addonAfter={' đ'}
                            />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Quantity is required!',
                                }
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Category is required!',
                                }
                            ]}
                        >
                            <Select
                                style={{ width: "100%" }}
                                name="category"
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
                        </Form.Item>
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
                                style={{ display: 'none' }}
                                type='file' hidden id='btnUpload'
                                onChange={(event) => handleOnChangeFile(event)}
                                onClick={(event) => event.target.value = null}
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
            </Form>
        </Modal>
    );

}

export default UpdateBookUncontrol;