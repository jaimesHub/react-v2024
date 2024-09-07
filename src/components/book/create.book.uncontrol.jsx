import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUncontrol = (props) => {
    const {
        isCreateOpen,
        setIsCreateOpen,
        loadBook
    } = props;

    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload thumbnail image!"
            })
            return;
        }

        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book");

        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;
            //step 2: create book
            const resBook = await createBookAPI(
                newThumbnail,
                values.mainText,
                values.author,
                values.price,
                values.quantity,
                values.category
            );

            if (resBook.data) {
                resetAndCloseModal();

                await loadBook();

                notification.success({
                    message: "Create book",
                    description: "Create a new book successfully!"
                });

            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                });
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            });
        }

        // resetAndCloseModal();
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

        setIsCreateOpen(false);
    }

    return (
        <>
            <Modal
                title="Create Book"
                open={isCreateOpen}
                onOk={() => form.submit()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label="Title"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input author!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input price!',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={'đ'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input quantity!',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input category!',
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
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

                    <Form.Item
                        label="Thumbnail Image"
                        name="newThumbnail"
                    >
                        <>
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
                                    type='file'
                                    id='btnUpload'
                                    style={{ display: "none" }}
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
                        </>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CreateBookUncontrol;