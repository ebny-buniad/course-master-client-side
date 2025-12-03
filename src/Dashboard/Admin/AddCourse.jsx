import React from "react";
import { useForm } from "react-hook-form";
import useAxiosInstance from "../../hook/useAxiosInstance";
import toast from "react-hot-toast";
import { categories } from "../../utils/categories"
console.log(categories)

const AddCourse = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosInstance = useAxiosInstance();

    const onSubmit = async (data) => {
        const res = await axiosInstance.post('/api/courses', data);
        if (res.data.data) {
            toast.success('Course added!')
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Create New Course</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Course Image URL */}
                <div>
                    <label className="block font-medium mb-1">Course Image URL</label>
                    <input
                        type="text"
                        placeholder="Enter image URL"
                        {...register("imageUrl", { required: "Image URL is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
                </div>

                {/* Course Title */}
                <div>
                    <label className="block font-medium mb-1">Course Title</label>
                    <input
                        type="text"
                        placeholder="Enter course title"
                        {...register("title", { required: "Course title is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Course Description */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Course Description</label>
                    <textarea
                        placeholder="Enter course description"
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option value={category}>{category}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                {/* Instructor Name */}
                <div>
                    <label className="block font-medium mb-1">Instructor Name</label>
                    <input
                        type="text"
                        placeholder="Enter instructor name"
                        {...register("instructor", { required: "Instructor name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium mb-1">Price (USD)</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        {...register("price", { required: "Price is required", min: 0 })}
                        className="input input-bordered w-full"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Batch Name */}
                <div>
                    <label className="block font-medium mb-1">Batch Name</label>
                    <input
                        type="text"
                        placeholder="Enter batch name"
                        {...register("batchName", { required: "Batch name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.batchName && <p className="text-red-500 text-sm mt-1">{errors.batchName.message}</p>}
                </div>

                {/* Start Date */}
                <div>
                    <label className="block font-medium mb-1">Start Date</label>
                    <input
                        type="date"
                        {...register("startDate", { required: "Start date is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                </div>

                {/* End Date */}
                <div>
                    <label className="block font-medium mb-1">End Date</label>
                    <input
                        type="date"
                        {...register("endDate")}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Max Students */}
                <div>
                    <label className="block font-medium mb-1">Max Students</label>
                    <input
                        type="number"
                        placeholder="Enter max students"
                        {...register("maxStudents")}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Price range */}
                <div>
                    <label className="block font-medium mb-1">Price Range</label>
                    <select
                        {...register("priceRange", { required: "Price range is required" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Price Range</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                    </select>
                    {errors.priceRange && <p className="text-red-500 text-sm mt-1">{errors.priceRange.message}</p>}
                </div>

                {/* Course Syllabus */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Course Syllabus</label>
                    <textarea
                        placeholder="Enter course Syllabus list"
                        {...register("syllabus", { required: "Syllabus is required" })}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.syllabus && <p className="text-red-500 text-sm mt-1">{errors.syllabus.message}</p>}
                </div>

                {/* Submit Button (Full Width) */}
                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full mt-4">Create Course</button>
                </div>
            </form>
        </div>
    );
};

export default AddCourse;
