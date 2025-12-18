import React from 'react';
import { Input } from 'antd';

type ListSearchProps = React.ComponentProps<typeof Input.Search>;

const ListSearch: React.FC<ListSearchProps> = props => {
    const { onSearch, onFocus, onBlur, ...rest } = props;

    const handleSearch = (val: string) => {
        onSearch?.(val);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
    };

    return <Input.Search allowClear onSearch={handleSearch} onFocus={handleFocus} onBlur={handleBlur} {...rest} />;
};

export default ListSearch;
