import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const Container = styled.div``;

const UserInfo: FC = () => {
    // 如果已经登录的用户, 显示的是个人信息
    return (
        <Container>
            <Link to="/login">登录</Link>
        </Container>
    );
};

export default UserInfo;
