import React from 'react';
import { Typography, Space, Form, Input, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

interface RegisterProps {
    username: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
    nickname: string | undefined;
}

const Register: React.FC = () => {
    const onHandleRegister = (values: RegisterProps) => {
        console.log(values);
    };

    return (
        <div className="flex flex-col justify-center items-center mt-[150px]">
            <div>
                <Space>
                    <Typography.Title level={2}>
                        <UserAddOutlined />
                    </Typography.Title>
                    <Typography.Title level={2}>新用户注册</Typography.Title>
                </Space>
            </div>
            <div className="w-[350px]">
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onHandleRegister}>
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
                    <Form.Item label="确认密码" name="confirmPassword" rules={[{ required: true, message: '请确认密码' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="昵称" name="nickname" rules={[{ required: true, message: '请输入昵称' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" size="large" htmlType="submit">
                                注册
                            </Button>
                            <Link to="/login">已有账号？去登录</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
