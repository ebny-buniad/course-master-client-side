import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';

const AuthLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayouts;