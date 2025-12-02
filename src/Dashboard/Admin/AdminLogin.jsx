// AdminLogin.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLock } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import useAxiosInstance from "../../hook/useAxiosInstance";

const AdminLogin = () => {
    const axiosInstance = useAxiosInstance();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        const adminInfo = {
            email: data.email,
            password: data.password,
        }

        const res = await axiosInstance.post('/api/admin', adminInfo);
        console.log(res.data)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-3">Admin Login</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Sign in with your admin email
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                        {/* {loginErr && <p className='text-xs text-red-500 mt-3'>Password or email is wrong!</p>} */}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Log in
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                    Only admins are allowed here.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
