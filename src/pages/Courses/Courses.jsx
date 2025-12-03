import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { FaChevronDown } from "react-icons/fa";
import useAxiosInstance from "../../hook/useAxiosInstance";
import Container from "../../Components/Container/Container";
import { categories } from "../../utils/categories"
import { CiHeart, CiUser } from "react-icons/ci";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa6";

const Courses = () => {
    const axiosInstance = useAxiosInstance();

    // ---------------------- FORM SETUP ----------------------
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            search: "",
            category: [],
            sort: "",
        },
    });

    // const searchValue = watch("search");

    const filters = watch();
    const { data: courses = [] } = useQuery({
        queryKey: ["load-courses", filters],
        queryFn: async () => {
            const res = await axiosInstance.get("/api/courses", {
                params: {
                    search: filters.search || "",
                    category: Array.isArray(filters.category)
                        ? filters.category.join(",")
                        : filters.category || "",
                    priceRange: filters.sort,
                    // page: filters.page || 1,
                    // limit: filters.limit || 10,
                },
            });
            return res.data.data;
        },
    });

    // ---------------------- CLEAR FILTERS ----------------------
    const handleClear = () => {
        reset({
            search: "",
            category: [],
            sort: "",
        });
    };

    // ---------------------- TOGGLE CATEGORY ----------------------
    const toggleCategory = (categoryName) => {
        let current = watch("category") || [];

        if (current.includes(categoryName)) {
            setValue(
                "category",
                current.filter((c) => c !== categoryName)
            );
        } else {
            setValue("category", [...current, categoryName]);
        }
    };

    return (
        <div>
            <Container>
                <div className="grid lg:grid-cols-8 gap-5 my-10 items-start">
                    {/* --------- FILTER SECTION --------- */}
                    <div className="col-span-2 p-3 shadow rounded-xl md:sticky top-20">
                        <h2 className="text-xl font-bold mb-3">Filters</h2>

                        <form onSubmit={handleSubmit(() => { })} className="space-y-4">

                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search by Title/Instructor"
                                {...register("search")}
                                className="input input-bordered w-full"
                            />

                            {/* Category Selection */}
                            <div className="space-y-2">
                                <label className="font-semibold">Category</label>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            className="flex items-center gap-2 cursor-pointer"
                                            onClick={() => toggleCategory(cat)}
                                        >
                                            <input
                                                type="checkbox"
                                                value={cat}
                                                checked={watch("category")?.includes(cat)}
                                                readOnly
                                            />
                                            <span>{cat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <button className="btn btn-primary w-full">Apply Filters</button>
                            <button type="button" className="btn w-full" onClick={handleClear}>
                                Clear Filters
                            </button>
                        </form>
                    </div>

                    {/* --------- COURSES LIST SECTION --------- */}

                    <div className="col-span-6 p-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold">All Courses</h2>
                                <p>{courses.length} courses found</p>
                            </div>

                            {/* Top Sort Dropdown */}
                            <div className="flex items-center gap-2">
                                <p>Sort by:</p>
                                <div className="relative w-32">
                                    <select
                                        {...register("sort")}
                                        className="select w-full appearance-none pr-10 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Price</option>
                                        <option value="Low">Low Price</option>
                                        <option value="High">High Price</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* COURSE CARDS */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                            {courses.map((course) => (
                                <Link to={`/course-details/${course._id}`}>
                                    <div
                                        key={course._id}
                                        className="card bg-base-100 shadow-sm rounded-2xl overflow-hidden 
                                 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group cursor-pointer"
                                    >
                                        <figure className="overflow-hidden">
                                            <img
                                                className="h-60 w-full object-cover transition-transform duration-500 
                                             group-hover:scale-105"
                                                src={course.imageUrl}
                                                alt={course.title}
                                            />
                                        </figure>

                                        <div className="p-3 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <p className="bg-pink-100 inline-block text-xs px-2 py-1 rounded-full text-pink-600">
                                                    {course.category}
                                                </p>
                                                <button>
                                                    <CiHeart className="text-pink-600 cursor-pointer" size={20} />
                                                </button>
                                            </div>

                                            <h2
                                                className="card-title transition-colors duration-300 
                                         group-hover:text-pink-600"
                                            >
                                                {course.title}
                                            </h2>

                                            <p className="text-sm text-gray-600">
                                                {course.description.length > 20
                                                    ? course.description.substring(0, 60) + "..."
                                                    : course.description}
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <CiUser size={20} />
                                                <p>{course.instructor}</p>
                                            </div>

                                            <div className="flex items-center justify-between border-t  border-gray-200 pt-3">
                                                <div>
                                                    <p className="flex items-center gap-1"><FaStar className="text-yellow-400" /><span className="font-semibold"> 4.5</span></p>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold text-violet-500">$ {course.price}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Courses;
