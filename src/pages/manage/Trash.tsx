import React, { useState } from 'react';
import styles from './common.module.scss';
import { Typography, Empty, Table, Tag, Space, Button, Modal } from 'antd';
import styled from 'styled-components';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '@/components/ListSearch';

const SpaceContainer = styled.div`
    margin-bottom: 16px;
`;

const { confirm } = Modal;

const ManageTrash: React.FC = () => {
    const [questionList] = useState([
        { _id: 1, title: 'Question 1', content: 'Content 1', isPublished: true, isStar: false, answerCount: 95, createAt: '2023-01-01' },
        { _id: 2, title: 'Question 2', content: 'Content 2', isPublished: false, isStar: true, answerCount: 15, createAt: '2023-11-02' },
        { _id: 3, title: 'Question 3', content: 'Content 3', isPublished: true, isStar: false, answerCount: 25, createAt: '2023-11-20' }
    ]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const tableColumns = [
        { title: '标题', dataIndex: 'title', key: 'title' },
        {
            title: '发布状态',
            dataIndex: 'isPublished',
            key: 'isPublished',
            render: (isPublished: boolean) => {
                return isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag>;
            }
        },
        { title: '填写数量', dataIndex: 'answerCount', key: 'answerCount' },
        { title: '创建时间', dataIndex: 'createAt', key: 'createAt' }
    ];

    function del() {
        confirm({
            title: '确认彻底删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '删除后不可以找回',
            onOk: () => {
                alert(JSON.stringify(selectedIds));
            }
        });
    }

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
                    <Typography.Title level={3}>回收站</Typography.Title>
                </div>
                <div className={`transition-[width] ease-in-out duration-100 ${focusSearchEl ? 'w-[50%]' : 'w-[220px]'}`}>
                    <ListSearch className="w-full" onFocus={onHandleFocusSearch} onBlur={onHandleBlurSearch} />
                </div>
            </div>
            <div className={styles.content}>
                {questionList.length > 0 ? (
                    <div>
                        <SpaceContainer>
                            <Space>
                                <Button type="primary" disabled={selectedIds.length === 0}>
                                    恢复
                                </Button>
                                <Button danger onClick={del}>
                                    删除
                                </Button>
                            </Space>
                        </SpaceContainer>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                onChange: selectedRowKeys => {
                                    console.log('onChange', selectedRowKeys);
                                    setSelectedIds(selectedRowKeys as string[]);
                                }
                            }}
                            rowKey={q => q._id}
                            pagination={false}
                            columns={tableColumns}
                            dataSource={questionList}
                        ></Table>
                    </div>
                ) : (
                    <Empty description="暂无数据" />
                )}
            </div>
        </div>
    );
};

export default ManageTrash;
