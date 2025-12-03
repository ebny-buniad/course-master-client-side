import React from 'react';
import Container from '../Container/Container';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../Logo/Logo';
import { FaBell, FaHeart } from 'react-icons/fa6';
import useAuth from '../../hook/useAuth';
import { MdLogout } from 'react-icons/md';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const links = <>
        <li><NavLink to='/'>Courses</NavLink></li>
        <li><NavLink to='/'>Categories</NavLink></li>
        <li><NavLink to='/'>Instructors</NavLink></li>
        <li><NavLink to='/'>About</NavLink></li>
    </>


    const handelLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch((error) => {
                console.log(error)
            })
    }


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
                                className="menu menu-sm dropdown-content bg-base-100 
                                rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                                {/* Condition rendaring user is available */}
                                {!user && <>
                                    <div className='flex flex-col border-t border-gray-200 pt-2 mt-5 space-y-2 md:hidden'>
                                        <Link to='/auth/login' className='text-[16px] font-bold text-violet-500'>Log In</Link>
                                        <button onClick={() => navigate('/auth/signUp')}
                                            className="btn rounded-lg text-white text-[16px] p-6 bg-linear-to-r from-indigo-500 to-violet-500">Sign Up</button>
                                    </div>
                                </>}
                            </ul>
                        </div>
                        <Logo></Logo>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end md:gap-5 gap-3">
                        <FaBell className='text-gray-600 hover:cursor-pointer hover:text-violet-500' size={20} />
                        <FaHeart className='text-gray-600 hover:cursor-pointer hover:text-violet-500' size={20} />
                        {/* Condition rendaring user is available */}
                        {!user && <>
                            <Link to='/auth/login' className='text-[16px] font-bold text-violet-500 hidden md:flex'>Log In</Link>
                            <button onClick={() => navigate('/auth/signUp')}
                                className="btn rounded-lg text-white text-[16px] p-6 bg-linear-to-r from-indigo-500 to-violet-500 hidden md:flex">Sign Up</button>
                        </>}

                        {user && <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><Link to='/student-dashboard'>Dashboard</Link></li>
                                    <li><Link to='/'>Course</Link></li>
                                    <li><Link to='/'>Assignments & Quizzes</Link></li>
                                    <li className='border-t border-gray-200 mt-3 pt-2'><button onClick={() => { handelLogOut() }}
                                        className='text-violet-500 font-semibold'><MdLogout size={18} />Logout</button></li>
                                </ul>
                            </div>
                        </>}
                    </div>








                </div>
            </Container>
        </div>
    );
};

export default Navbar;