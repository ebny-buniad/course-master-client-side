import React from "react";
import { useForm } from "react-hook-form";
import useAxiosInstance from "../../hook/useAxiosInstance";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const UpdateCourse = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosInstance = useAxiosInstance();
    const { id } = useParams();
    const { data: courseData = {}, isPending } = useQuery({
        queryKey: ['get-course'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/courses/${id}`);
            return res.data.data
        }
    })

    if (isPending) {
        return <p>Loading...</p>
    }

    const { title, imageUrl, description, category, instructor, price, priceRange, batches: [
        {
            name: batchName,
            startDate: batchStartDate,
            endDate: batchEndDate,
            maxStudents
        }
    ] } = courseData;


    const onSubmit = async (data) => {
        const res = await axiosInstance.put(`/api/courses/${id}`, data);
        if (res.data.data) {
            toast.success('Course updated!')
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Update Course</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Course Image URL */}
                <div>
                    <label className="block font-medium mb-1">Course Image URL</label>
                    <input
                        defaultValue={imageUrl}
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
                        defaultValue={title}
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
                        defaultValue={description}
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
                        defaultValue={category}
                        {...register("category", { required: "Category is required" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Category</option>
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business">Business</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                {/* Instructor Name */}
                <div>
                    <label className="block font-medium mb-1">Instructor Name</label>
                    <input
                        defaultValue={instructor}
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
                        defaultValue={price}
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
                        defaultValue={batchName}
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
                        defaultValue={batchStartDate}
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
                        defaultValue={batchEndDate}
                        type="date"
                        {...register("endDate")}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Max Students */}
                <div>
                    <label className="block font-medium mb-1">Max Students</label>
                    <input
                        defaultValue={maxStudents}
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
                        defaultValue={priceRange}
                        {...register("priceRange", { required: "Price range is required" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Price Range</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                    </select>
                    {errors.priceRange && <p className="text-red-500 text-sm mt-1">{errors.priceRange.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full mt-4">Update Course</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCourse;
