import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';
import Footer from '../Components/Footer/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-250px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;