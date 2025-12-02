import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Plus } from "lucide-react";
import useAxiosInstance from "../../hook/useAxiosInstance";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

const CourseManagement = () => {
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate();

    // React Hook Form
    const { register, watch } = useForm();
    const searchValue = watch("search") || "";
    const batchValue = watch("batch") || "all";

    // Load all courses
    const { data: courses = [], isPending, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const res = await axiosInstance.get("/api/courses");
            return res.data.data;
        },
    });

    // Loading state
    if (isPending) return <p>Loading...</p>;

    // Filtering Logic
    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title
            .toLowerCase()
            .includes(searchValue.toLowerCase());

        const matchesBatch =
            batchValue === "all" ||
            course.batches.some((b) => b.name.toLowerCase() === batchValue);

        return matchesSearch && matchesBatch;
    });

    const handelUpdate = (id) => {
        navigate(`/admin-dashboard/update-course/${id}`)
    }

    const handelDelete = async (id) => {
        const res = await axiosInstance.delete(`/api/courses/${id}`);
        if (res.data.data.deletedCount === 1) {
            refetch;
            toast.success("Course deleted!")
        }
        refetch();
    }



    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Courses Management</h2>

                <Link
                    to="/admin-dashboard/add-course"
                    className="btn bg-linear-to-r from-indigo-500 to-violet-500 text-white font-medium"
                >
                    <Plus size={15} /> Add Course
                </Link>
            </div>

            {/* Filter Section */}
            <div className="my-5">
                <h4 className="text-xl font-bold mb-3">Course Filters</h4>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Search Input */}
                    <div className="relative w-full">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by course name..."
                            {...register("search")}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    {/* Batch Select */}
                    <select
                        className="select select-bordered py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                        {...register("batch")}
                    >
                        <option value="all">All Batches</option>
                        <option value="batch-1">Batch 1</option>
                        <option value="batch-2">Batch 2</option>
                    </select>
                </form>
            </div>


            <div className="overflow-x-auto rounded-lg shadow">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th>SL</th>
                            <th>Course Title</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Batch</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, index) => (
                                <tr key={course._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-medium">{course.title}</td>
                                    <td>{course.instructor}</td>
                                    <td>${course.price}</td>
                                    <td>
                                        {course.batches[0].startDate
                                            ? new Date(course.batches[0].startDate).toISOString().split("T")[0]
                                            : ""}
                                    </td>
                                    <td>
                                        {course.batches[0].endDate
                                            ? new Date(course.batches[0].endDate).toISOString().split("T")[0]
                                            : ""}
                                    </td>

                                    <td>
                                        {course.batches.length > 0
                                            ? course.batches[0].name
                                            : "N/A"}
                                    </td>
                                    <td className="flex gap-4">
                                        <button onClick={() => handelUpdate(course._id)} className="cursor-pointer hover:text-violet-500"><MdEdit size={20} /></button>
                                        <button onClick={() => handelDelete(course._id)} className="cursor-pointer hover:text-red-500"><MdDeleteOutline size={20} /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-gray-500">
                                    No courses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center my-5">
                <p>Showing 5 of 10 courses</p>
                <div class="flex space-x-1">
                    <button class="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        Prev
                    </button>
                    <button class="min-w-9 rounded-md bg-slate-800 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        1
                    </button>
                    <button class="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        2
                    </button>
                    <button class="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        3
                    </button>
                    <button class="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseManagement;
