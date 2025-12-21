import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: () => {
            // 随机16位的一个token
            return Mock.mock({
                code: 200,
                message: '登录成功',
                data: {
                    token: Mock.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 16)
                }
            });
        }
    }
] as MockMethod[];
