import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

const CourseFilter = ({ categories, onFilterChange }) => {
    

    const { register, watch, setValue } = useForm({
        defaultValues: {
            search: "",
            category: [],
            sort: "",
        },
    });

    // 🔍 Watch form values live (search auto works)
    const watchAll = watch();

    // 🔄 Send updated filters to parent
    useEffect(() => {
        onFilterChange(watchAll);
    }, [watchAll, onFilterChange]);

    return (
        <div className="w-64 bg-white rounded-xl shadow-md p-6 sticky top-10">

            {/* Title */}
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Search */}
            <label className="font-semibold text-sm">Search by Title/Instructor</label>
            <div className="relative mt-2 mb-5">
                <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered w-full pl-10"
                    {...register("search")}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            </div>

            <hr className="my-3" />

            {/* Category */}
            <h3 className="font-semibold mb-2">Category</h3>
            <div className="flex flex-col gap-2">

                {categories.map((item, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            value={item.name}
                            {...register("category")}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">
                            ({item.count})
                        </span>
                    </label>
                ))}
            </div>

            <hr className="my-3" />

            {/* Sort */}
            <h3 className="font-semibold mb-2">Sort By</h3>
            <select
                className="select select-bordered w-full"
                {...register("sort")}
            >
                <option value="">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
            </select>
        </div>
    );
};

export default CourseFilter;
