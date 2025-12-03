import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";

const CoursePayment = () => {
    const axiosSecure = useAxiosSecure();;
    const [method, setMethod] = useState("");
    const { user } = useAuth();
    const { id } = useParams();
    const { data: course = [], isPending } = useQuery({
        queryKey: ["load-single-course", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/courses/${id}`)
            return res.data.data
        }
    });

    const { _id, category, instructor, batches, title, imageUrl } = course;

    const enroleInfo = {
        courseId: _id,
        imageUrl,
        category,
        instructor,
        batches,
        title,
        studentEmail: user?.email,
        enrolledAt: new Date().toISOString(),
    }

    if (isPending) {
        return <p>Loading...</p>
    }

    const paymentOptions = [
        { id: "bkash", label: "bKash", img: "https://www.logo.wine/a/logo/BKash/BKash-bKash2-Logo.wine.svg" },
        { id: "nagad", label: "Nagad", img: "https://nagad.com.bd/_nuxt/img/new-logo.14fe8a5.png" },
        { id: "rocket", label: "Rocket", img: "https://images.seeklogo.com/logo-png/31/1/dutch-bangla-rocket-logo-png_seeklogo-317692.png" },
    ];

    const handelEnrolement = async () => {
        try {
            const res = await axiosSecure.post('/api/enrolled-courses', enroleInfo);
            if (res.data.data.insertedId) {
                toast.success("Enrole Success!")
            }
        }
        catch (error) {
            toast.error('Already enrolled!')
        }
    }


    return (
        <div className="pt-30">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Select Payment Method</h2>

                <div className="space-y-4">
                    {paymentOptions.map((option) => (
                        <label
                            key={option.id}
                            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-300
              ${method === option.id ? "border-pink-600 bg-pink-50 shadow-md" : "border-gray-300 hover:shadow-sm"}
            `}
                        >
                            <input
                                type="radio"
                                name="payment"
                                className="radio radio-primary"
                                value={option.id}
                                onChange={() => setMethod(option.id)}
                            />

                            <img src={option.img} alt={option.label} className="h-10 w-10 object-contain" />

                            <span className="font-medium text-lg">{option.label}</span>
                        </label>
                    ))}
                </div>

                {/* Pay Button */}
                <button onClick={() => handelEnrolement()}
                    disabled={!method}
                    className={`btn w-full mt-6 text-white ${method ? "btn-primary" : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    <FaMoneyBillWave size={18} />
                    Enroll now
                </button>
            </div>
        </div>
    );
};

export default CoursePayment;
