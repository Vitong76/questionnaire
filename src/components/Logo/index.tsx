import React from 'react';
import type { FC } from 'react';
import { Flex } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { Link } from 'react-router';

const Logo: FC = () => {
    return (
        <div className={styles.container}>
            <Link to="/">
                <Flex align="center" style={{ height: '100%' }}>
                    <h1>
                        <FormOutlined />
                    </h1>
                    <h1>靓AI问卷</h1>
                </Flex>
            </Link>
        </div>
    );
};

export default Logo;
