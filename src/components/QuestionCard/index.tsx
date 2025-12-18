import React from 'react';
import type { FC } from 'react';
import styled from './index.module.scss';
import { Button, Space, Divider, Tag, Popconfirm } from 'antd';
import { EditOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router';

interface QuestionCardProps {
    _id: number;
    title: string;
    content: string;
    isPublished: boolean;
    isStar: boolean;
    answerCount: number;
    createAt: string;
}

const QuestionCard: FC<QuestionCardProps> = props => {
    console.log('props', props);
    const nav = useNavigate();

    return (
        <div className={styled.card}>
            <div className={styled.title}>
                <div className={styled.left}>
                    <Link to={props.isPublished ? `/question/stat/${props._id}` : `/question/edit/${props._id}`}>
                        <Space>
                            {props.isStar && <StarOutlined style={{ color: 'red' }} />}
                            {props.title}
                        </Space>
                    </Link>
                </div>
                <div className={styled.right}>
                    <Space>
                        {props.isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
                        <span>答卷: {props.answerCount}</span>
                        <span>{props.createAt}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className={styled.operation}>
                <div className={styled.left}>
                    <Space>
                        <Button type="text" size="small" icon={<EditOutlined />} onClick={() => nav(`/question/edit/${props._id}`)}>
                            编辑问卷
                        </Button>
                        <Button type="text" size="small" icon={<LineChartOutlined />} onClick={() => nav(`/question/stat/${props._id}`)}>
                            问卷统计
                        </Button>
                    </Space>
                </div>
                <div className={styled.right}>
                    <Space>
                        <Button type="text" icon={<StarOutlined />} size="small">
                            {props.isStar ? '取消标星' : '标星'}
                        </Button>
                        <Popconfirm title="确认复制该问卷?" okText="确定" cancelText="取消">
                            <Button type="text" icon={<CopyOutlined />} size="small">
                                复制
                            </Button>
                        </Popconfirm>

                        <Button type="text" icon={<DeleteOutlined />} size="small">
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
