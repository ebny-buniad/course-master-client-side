import React from 'react';
import Container from '../Container/Container';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import { FaBell, FaHeart } from 'react-icons/fa6';

const Navbar = () => {
    const links = <>
        <li><NavLink to='/'>Courses</NavLink></li>
        <li><NavLink to='/'>Categories</NavLink></li>
        <li><NavLink to='/'>Instructors</NavLink></li>
        <li><NavLink to='/'>About</NavLink></li>
    </>
    return (
        <div
            className='bg-white shadow-sm fixed w-full z-50'>
            <Container>
                <div className="navbar py-3">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <Logo></Logo>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end gap-5">
                        <FaBell className='text-gray-600 hover:cursor-pointer hover:text-violet-500' size={20} />
                        <FaHeart className='text-gray-600 hover:cursor-pointer hover:text-violet-500' size={20} />
                        <Link to='' className='text-[16px] font-bold text-violet-500'>Log In</Link>
                        <button className="btn rounded-lg text-white text-[16px] p-6 bg-linear-to-r from-indigo-500 to-violet-500">Sign Up</button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;