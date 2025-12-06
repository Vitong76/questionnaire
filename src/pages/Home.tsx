import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    height: calc(100vh - 64px - 65px);
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Info = styled.div`
    text-align: center;

    Button {
        height: 60px;
        font-size: 24px;
    }
`;

const Home: React.FC = () => {
    const nav = useNavigate();

    const clickHandler = () => {
        nav('/manage/list');
    };

    return (
        <Container>
            <Info>
                <Typography.Title>问卷调查 | 在线投票</Typography.Title>
                <Typography.Paragraph>
                    欢迎来到我们的问卷调查平台。在这里，您可以轻松创建和参与各种类型的问卷调查，包括在线投票、调查和民意调查。无论是您是组织还是个人，都可以通过我们的平台来收集和分析数据，以做出更明智的决策。
                </Typography.Paragraph>
                <div>
                    <Button onClick={clickHandler} type="primary">
                        开始创建
                    </Button>
                </div>
            </Info>
        </Container>
    );
};

export default Home;
