import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import style from './ManageLayout.module.scss';
import { Button, Space, Divider } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';

const ManageLayout: React.FC = () => {
    const nav = useNavigate();
    const location = useLocation();

    return (
        <div className={style.container}>
            <div className={style.left}>
                <Space orientation="vertical" size="middle">
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        创建问卷
                    </Button>
                    <Divider style={{ borderTop: 'transparent' }} />
                    <Button type={location.pathname.startsWith('/manage/list') ? 'default' : 'text'} size="large" icon={<BarsOutlined />} onClick={() => nav('/manage/list')}>
                        我的问卷
                    </Button>
                    <Button type={location.pathname.startsWith('/manage/star') ? 'default' : 'text'} size="large" icon={<StarOutlined />} onClick={() => nav('/manage/star')}>
                        星标问卷
                    </Button>
                    <Button type={location.pathname.startsWith('/manage/trash') ? 'default' : 'text'} size="large" icon={<DeleteOutlined />} onClick={() => nav('/manage/trash')}>
                        回收站
                    </Button>
                </Space>
            </div>
            <div className={style.right}>
                <Outlet />
            </div>
        </div>
    );
};

export default ManageLayout;
