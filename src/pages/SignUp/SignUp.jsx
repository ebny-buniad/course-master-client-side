import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLock, BiUser } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import useAxiosInstance from "../../hook/useAxiosInstance";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [fbError, setFbError] = useState(false);
    const { createUser } = useAuth();
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { name, email, phone, password } = data;
        const userInfo = {
            name,
            email,
            phone,
            role: 'student',
            createdAt: new Date().toISOString()
        }

        createUser(email, password)
            .then(async () => {
                // Send user in DB
                const res = await axiosInstance.post('/api/users', userInfo);
                console.log(res)
                if (res.data.data.insertedId) {
                    navigate('/')
                }
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setFbError(true);
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-3">Student Signup</h2>
                <p className="text-xs text-center mb-3">Hey enter your details to create your account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name*</label>
                        <div className="relative">
                            <BiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

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

                    {/* Phone */}
                    <div>
                        <label className="text-xs">Phone Number</label>
                        <div className="relative">
                            <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Enter your phone"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    minLength: { value: 10, message: "Enter a valid number" },
                                })}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    },
                                    // pattern: {
                                    //     value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                    //     message: "Password must contain at least one uppercase, one number, and one special character",
                                    // }
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
                    </div>

                    {/* Submit Button */}
                    <button className="btn rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 hover:bg-purple-700 text-white w-full mt-4">
                        Create Account
                    </button>
                </form>
                {fbError && <p className='text-xs text-red-400'>This email alredy registred</p>}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?
                    <Link to='/auth/login' className="text-purple-600 font-semibold ml-1">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
