import { Button, Input, InputNumber, Modal, Select } from "antd";
import { useState } from "react";

const BookForm = (props) => {
    // const { loadBook } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        setIsModalOpen(false);
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
    }

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
                        <Input />
                    </div>

                    <div>
                        <span>Author</span>
                        <Input />
                    </div>

                    <div>
                        <span>Price</span>
                        <InputNumber
                            addonAfter="đ" style={{ width: "100%" }}
                            onChange={(value) => { console.log(">>> price:: ", value) }}
                        />
                    </div>

                    <div>
                        <span>Quantity</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            onChange={(value) => { console.log(">>> quantity:: ", value) }}
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
                            onChange={(value) => { console.log(">>> select:: ", value) }}
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
                        // onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );

}

export default BookForm;