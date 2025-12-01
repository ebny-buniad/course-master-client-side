import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';

const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-250px)]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayouts;