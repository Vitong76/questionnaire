import React from 'react';
import { Outlet } from 'react-router';
import { Layout } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '@/components/Logo';
import UserInfo from '@/components/UserInfo';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <UserInfo />
                </div>
            </Header>
            <Content className={styles.main}>
                <Outlet />
            </Content>
            <Footer className={styles.footer}>靓AI问卷系统 ©2025 Created by 10086</Footer>
        </Layout>
    );
};

export default MainLayout;
