import { useState } from 'react';
import type { FC } from 'react';
import styled from './List.module.scss';
import QuestionCard from '@/components/QuestionCard';

const List: FC = () => {
    const [questionList] = useState([
        { _id: 1, title: 'Question 1', content: 'Content 1', isPublished: true, isStart: false, answerCount: 95, createAt: '2023-01-01' },
        { _id: 2, title: 'Question 2', content: 'Content 2', isPublished: true, isStart: true, answerCount: 15, createAt: '2023-11-02' },
        { _id: 3, title: 'Question 3', content: 'Content 3', isPublished: true, isStart: false, answerCount: 25, createAt: '2023-11-20' }
    ]);

    return (
        <div style={{ padding: '20px', background: '#f3f4f8' }}>
            <div className={styled.header}>
                <div className={styled.left}>
                    <h3>我的问卷</h3>
                </div>
                <div className={styled.right}>(搜索)</div>
            </div>
            <div className={styled.content}>
                {questionList.map(item => (
                    <QuestionCard key={item._id} {...item} />
                ))}
            </div>
            <div className={styled.footer}>footer</div>
        </div>
    );
};

export default List;
