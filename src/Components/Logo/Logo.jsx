import React from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { Link } from "react-router";

const Logo = () => {
    return (
        <div>
            <Link to='/'>
                <div className="flex items-center gap-2">
                    {/* Icon container */}
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-r from-indigo-500 to-violet-500"
                    >
                        <FaGraduationCap className="text-white" size={24} />
                    </div>

                    {/* Text */}
                    <span className="text-2xl font-bold bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                        CourseMaster
                    </span>
                </div></Link>
        </div>
    );
};

export default Logo;
