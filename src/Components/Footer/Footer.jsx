import React from 'react';
import Logo from '../Logo/Logo'
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                <aside>
                    <Logo></Logo>
                    <p>
                        Download Our Mobile App
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {/* Google Play Button */}
                        <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition">
                            <FaGooglePlay className="text-xl" />
                            <div className="text-left leading-tight">
                                <p className="text-xs">GET IT ON</p>
                                <p className="text-sm font-semibold">Google Play</p>
                            </div>
                        </button>

                        {/* iOS / App Store Button */}
                        <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition">
                            <FaApple className="text-2xl" />
                            <div className="text-left leading-tight">
                                <p className="text-xs">Download on the</p>
                                <p className="text-sm font-semibold">App Store</p>
                            </div>
                        </button>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">Career / Recruitment</a>
                    <a className="link link-hover">Join as a Teacher</a>
                    <a className="link link-hover">Affiliate Registration</a>
                    <a className="link link-hover">About us</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;