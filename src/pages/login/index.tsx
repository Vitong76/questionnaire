import React, { useEffect } from 'react';
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

const USERNAME_KEY = 'username';
const PASSWORD_KEY = 'password';

const Login: React.FC = () => {
    const [form] = Form.useForm(); // 第三方hook

    const onHandleLogin = (values: { username: string; password: string; remember: boolean }) => {
        console.log('login', values);

        if (values.remember) {
            rememberUser(values.username, values.password);
        } else {
            clearRememberUser();
        }
    };

    function rememberUser(username: string, password: string) {
        // 模拟记住用户
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(PASSWORD_KEY, password);
    }

    function getRememberUser() {
        const username = localStorage.getItem(USERNAME_KEY) || '';
        const password = localStorage.getItem(PASSWORD_KEY) || '';
        return { username, password };
    }

    function clearRememberUser() {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(PASSWORD_KEY);
    }

    useEffect(() => {
        const { username, password } = getRememberUser();
        form.setFieldsValue({ username, password, remember: !!username && !!password });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col justify-center items-center mt-[150px]">
            <div>
                <Space>
                    <Typography.Title level={2}>
                        <UserAddOutlined />
                    </Typography.Title>
                    <Typography.Title level={2}>用户登录</Typography.Title>
                </Space>
            </div>
            <div className="w-[350px]">
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onHandleLogin} form={form}>
                    <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码' },
                            { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, message: '密码必须包含字母和数字' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" size="large" htmlType="submit">
                                登录
                            </Button>
                            <Link to="/register">没有账号？去注册</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
