import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
    primary?: boolean;
    cook?: boolean;
}

const Button = styled.button<ButtonProps>`
    color: ${props => (props.primary ? 'red' : 'blue')};
    font-size: 1em;
    margin: 1em;

    ${props =>
        props.cook &&
        css`
            border: 2px solid palevioletred;
            border-radius: 3px;
            padding: 0.25em 1em;
            background: palevioletred;
            color: white;
        `}
`;

const List2: React.FC = () => {
    return (
        <div>
            <h1>List 2</h1>
            <Button primary>Primary Button</Button>
            <Button cook>Secondary Button</Button>
        </div>
    );
};

export default List2;
