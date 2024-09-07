import { Button, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
    const { loadBooks } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    // const [thumbnail, setThumbnail] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        // 1. handle non-image fields
        console.log(">>> after filling non-image fields: ", { mainText, author, price, quantity, category })

        // 2. handle upload image field & preview
        console.log(">>> selectedFile: ", selectedFile);
        console.log(">>> preview: ", preview);

        if (!selectedFile) {
            message.error("Please uploading a image!");
            setIsModalOpen(false);
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        console.log(">>> check resUpload: ", resUpload);

        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded;
            console.log(">>> check newThumbnail:: ", newThumbnail);
            // setThumbnail(newThumbnail);

            if (!mainText || !author || !price || !quantity || !category) {
                notification.error({
                    message: "Error Create A New Book",
                    description: "You need to fill all of fields in this form!",
                });
                setIsModalOpen(false);
                return;
            }

            const newBook = {
                mainText,
                author,
                price,
                quantity,
                category,
                thumbnail: newThumbnail
            }

            const res = await createBookAPI(
                mainText,
                author,
                price,
                quantity,
                category, newThumbnail
            );
            console.log(">> res: ", res);

            if (res.data) {
                notification.success({
                    message: "Create a new book",
                    description: "Create a new book successfully!"
                });

                await loadBooks();

                resetAndCloseModal();
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(res.message)
                });
            }
        }

        // 4. reset form & close modal
    }

    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");

        setSelectedFile(null);
        setPreview(null);

        setIsModalOpen(false);
    }

    const handleOnChangeFile = (e) => {
        console.log(">>> e: ", e);

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = e.target.files[0];
        // console.log(">>> file:: ", file);
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    // console.log(">>> selectedFile: ", selectedFile);
    // console.log(">>> preview: ", preview);

    return (
        <>
            <div style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create Book
                </Button>
            </div>

            <Modal
                title="Create Book"
                open={isModalOpen}
                onOk={handleSubmitBtn}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Title</span>
                        <Input onChange={(event) => { setMainText(event.target.value) }} />
                    </div>

                    <div>
                        <span>Author</span>
                        <Input onChange={(event) => { setAuthor(event.target.value) }} />
                    </div>

                    <div>
                        <span>Price</span>
                        <InputNumber
                            addonAfter="đ" style={{ width: "100%" }}
                            onChange={(value) => { setPrice(value) }}
                        />
                    </div>

                    <div>
                        <span>Quantity</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            onChange={(value) => { setQuantity(value) }}
                        />
                    </div>

                    <div>
                        <span>Category</span>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Please select category"
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
                            onChange={(value) => { setCategory(value) }}
                        />
                    </div>

                    <div>
                        <label
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                            htmlFor="btnUpload">
                            Thumbnail Image
                        </label>
                        <input
                            type="file"
                            hidden
                            id="btnUpload"
                            onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                height: "100px",
                                width: "100px",
                                marginBottom: "15px"
                            }}>
                                <img
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain"
                                    }}
                                    src={preview}
                                />
                            </div>
                        </>
                    }
                </div>
            </Modal>
        </>
    );

}

export default BookForm;