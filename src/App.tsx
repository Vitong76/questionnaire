// import { useState } from 'react';
import type { FC } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import List from './components/List';
import List2 from './components/List2';

interface questionListItem {
    id: string;
    title: string;
    isPublished: boolean;
}

const List1: FC = () => {
    const questionList: questionListItem[] = [
        {
            id: 'q1',
            title: '问卷1',
            isPublished: true
        },
        {
            id: 'q2',
            title: '问卷2',
            isPublished: true
        },
        {
            id: 'q3',
            title: '问卷3',
            isPublished: false
        },
        {
            id: 'q4',
            title: '问卷11',
            isPublished: true
        }
    ];

    function edit(id: string) {
        console.log(id);
    }

    return (
        <div>
            <h1>问卷列表页</h1>
            <div>
                {questionList.map(item => {
                    const { id, title, isPublished } = item;
                    return (
                        <div key={id}>
                            <strong>{title}</strong>
                            &nbsp;
                            {/* 条件判断 */}
                            {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span style={{ color: 'red' }}>未发布</span>}
                            &nbsp;
                            <button onClick={() => edit(id)}>编辑</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

function App() {
    return (
        <div>
            <List1 />
            <List />
            <List2 />
        </div>
    );
}

export default App;
