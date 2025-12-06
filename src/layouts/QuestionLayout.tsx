import React from 'react';
import { Outlet } from 'react-router';

const QuestionLayout: React.FC = () => {
    return (
        <div>
            <p>Question layout</p>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default QuestionLayout;
