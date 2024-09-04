import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(">>> check values: ", values)
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
                                <Button type="primary" onClick={() => form.submit()}>
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