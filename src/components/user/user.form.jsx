import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClickBtn = () => {
        setIsModalOpen(true);
    }

    const handleSubmitBtn = async () => {
        // alert("me");

        const res = await createUserAPI(fullName, email, password, phone);

        console.log(">>> check res (After adding interceptors): ", res);

        // debugger
        if (res.data) {
            notification.success({
                message: "Create a new user",
                description: "Tạo mới người dùng thành công"
            });

            setIsModalOpen(false);
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            });
        }

        console.log(">>> check res (After adding interceptors): ", res.data);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table users</h3>
                <Button
                    onClick={handleClickBtn}
                    // onClick={() => setIsModalOpen(true)}
                    type="primary">Create user
                </Button>
            </div>

            <Modal
                title="Create user"
                open={isModalOpen}
                onOk={handleSubmitBtn}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UserForm;