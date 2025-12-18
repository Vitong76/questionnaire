import mock from 'mockjs';

mock.mock('/api/test', 'get', () => {
    return {
        code: 200,
        data: {
            name: '张三'
        }
    };
});
