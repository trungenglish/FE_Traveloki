import {Button, Form, Modal, Input} from 'antd';
import {useState} from "react";

const LoginModal = (props) => {
    const {isOpenLogin, setIsOpenLogin} = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const handleSubmitBtn = () =>{

    }

    const resetAndCloseModal = () => {
        setIsOpenLogin(false);
        form.resetFields();
    }

    return (
        <Modal
            title="Đăng nhập"
            open={isOpenLogin}
            onOk={form.submit}
            onCancel={resetAndCloseModal}
            maskClosable={true}
            okText={"Create"}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitBtn}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: "email",
                            message: 'Email không đúng định dạng!',
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input.Password onKeyDown={(event) => {
                        // nếu nhấn enter thì submit form
                        if(event.key === "Enter"){
                            form.submit()
                        }
                    }}/>
                </Form.Item>

                <Form.Item>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Button
                            loading={loading}
                            type="primary" onClick={() => form.submit()}>
                            Login
                        </Button>
                    </div>
                </Form.Item>

            </Form>
        </Modal>
    );
};
export default LoginModal;