import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Divider, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setIsLoading(true);

        const res = await loginAPI(values.email, values.password);

        if (res.data) {
            message.success("Login success");

            localStorage.setItem("access_token", res.data.access_token);

            setUser(res.data.user); // when user data changes -> component uses AuthContext will re-render

            navigate("/");
        } else {
            notification.error({
                message: "Login failed",
                description: JSON.stringify(res.message)
            });
        }

        setIsLoading(false);
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email is required!',
                                },
                                {
                                    type: "email",
                                    message: 'Email is wrong format!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is required!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                    loading={isLoading}
                                >
                                    Login
                                </Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Create account? <Link to={"/register"}>Register here</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>

    );
}

export default LoginPage;