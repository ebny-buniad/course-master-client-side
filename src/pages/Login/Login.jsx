import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiLock } from 'react-icons/bi';
import { CiMail } from 'react-icons/ci';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hook/useAuth';

const Login = () => {
    const { signInUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loginErr, setLoginErr] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(() => {
                navigate('/')
            }).catch((error) => {
                setLoginErr(error);
            })
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-3">Student Login</h2>
                <p className="text-xs text-center mb-3">Hey enter your email and password to login your account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email*</label>
                        <div className="relative">
                            <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password*</label>
                        <div className="relative">
                            <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter a strong password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}

                        {loginErr && <p className='text-xs text-red-500 mt-3'>Password or email is wrong!</p>}
                    </div>

                    {/* Submit Button */}
                    <button className="btn rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 hover:bg-purple-700 text-white w-full mt-4">
                        Login Account
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?
                    <Link to='/auth/signUp' className="text-purple-600 font-semibold ml-1">
                        Sing Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;