import React from 'react';
import type { FC } from 'react';
import styled from './index.module.scss';

interface QuestionCardProps {
    _id: number;
    title: string;
    content: string;
    isPublished: boolean;
    isStart: boolean;
    answerCount: number;
    createAt: string;
}

const QuestionCard: FC<QuestionCardProps> = props => {
    console.log('props', props);
    return (
        <div className={styled.card}>
            <div className={styled.title}>
                <div className={styled.left}>
                    <a href="#">{props.title}</a>
                </div>
                <div className={styled.right}>
                    {props.isPublished ? <span style={{ color: 'green' }}>{'已发布'}</span> : <span>{'未发布'}</span>}
                    &nbsp;
                    <span>答卷: {props.answerCount}</span>
                    &nbsp;
                    <span>{props.createAt}</span>
                </div>
            </div>
            <div className={styled.operation}>
                <div className={styled.left}>
                    <button>编辑问卷</button>
                    <button>数据统计</button>
                </div>
                <div className={styled.right}>
                    <button>标星</button>
                    <button>复制</button>
                    <button>删除</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
