import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn = async () => {
        // console.log(">>> check state: ", { fullName, email, password, phone });
        const res = await createUserAPI(fullName, email, password, phone);
        // if (res.data && res.data.data) {
        //     notification.success({
        //         message: "Create a new user",
        //         description: "Tạo mới người dùng thành công"
        //     });
        // }

        // console.log(">>> check res: ", res.data.data);

        console.log(">>> check res (After adding interceptors): ", res);
        if (res.data) {
            // After adding interceptors at axios.customize.js file
            notification.success({
                message: "Create a new user",
                description: "Tạo mới người dùng thành công"
            });
        }

        console.log(">>> check res (After adding interceptors): ", res.data);
    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
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
                <div>
                    <Button
                        onClick={handleClickBtn}
                        type="primary">Create user
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UserForm;