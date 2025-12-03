import React from 'react';

const Container = ({ children }) => {
    return (
        <div className='xl:w-9/12 mx-auto px-1'>
            {children}
        </div>
    );
};

export default Container;