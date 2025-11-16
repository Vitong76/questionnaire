import React from 'react';
import style from './index.module.scss';

const List: React.FC = () => {
    return (
        <div>
            <h1 id={style.check}>
                ccsk
                <div className={style.s2}>这是h2</div>
            </h1>
        </div>
    );
};

export default List;
