import React, { useState } from 'react';
import styles from './common.module.scss';
import QuestionCard from '@/components/QuestionCard';
import { Typography, Empty } from 'antd';
import ListSearch from '@/components/ListSearch';

const ManageStar: React.FC = () => {
    const [questionList] = useState([
        { _id: 1, title: 'Question 1', content: 'Content 1', isPublished: true, isStar: false, answerCount: 95, createAt: '2023-01-01' },
        { _id: 2, title: 'Question 2', content: 'Content 2', isPublished: true, isStar: true, answerCount: 15, createAt: '2023-11-02' },
        { _id: 3, title: 'Question 3', content: 'Content 3', isPublished: true, isStar: false, answerCount: 25, createAt: '2023-11-20' }
    ]);

    const [focusSearchEl, setFocusSearchEl] = useState<boolean>(false);
    const onHandleFocusSearch = () => {
        setFocusSearchEl(true);
    };
    const onHandleBlurSearch = () => {
        setFocusSearchEl(false);
    };
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Typography.Title level={3}>星标问卷</Typography.Title>
                </div>
                <div className={`transition-[width] ease-in-out duration-100 ${focusSearchEl ? 'w-[50%]' : 'w-[220px]'}`}>
                    <ListSearch className="w-full" onFocus={onHandleFocusSearch} onBlur={onHandleBlurSearch} />
                </div>
            </div>
            <div className={styles.content}>
                {/* 问卷列表 */}
                {questionList.length > 0 ? questionList.map(item => <QuestionCard key={item._id} {...item} />) : <Empty description="暂无数据" />}
            </div>
            <div className={styles.footer}>分页</div>
        </div>
    );
};

export default ManageStar;
