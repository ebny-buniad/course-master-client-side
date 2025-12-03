import React from 'react';
import useAxiosInstance from '../../hook/useAxiosInstance';
import useAuth from '../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import Container from '../../Components/Container/Container';
import { MdUpdate, MdUpdateDisabled } from 'react-icons/md';
import { CiCreditCard1 } from 'react-icons/ci';
import { IoIosArrowRoundBack } from 'react-icons/io';

const CourseDetails = () => {
    const axiosInstance = useAxiosInstance();
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: course = [], isPending } = useQuery({
        queryKey: ["load-single-course", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/courses/${id}`)
            return res.data.data
        }
    });

    if (isPending) {
        return <p>Loading...</p>
    }


    return (
        <div>
            <Container>
                <div className='pt-25 pb-10 md:w-5xl mx-auto'>
                    <h3 className='text-2xl font-bold'>Confirm Your Enrollment</h3>
                    <p>Review your course selection and complete your enrollment</p>

                    <div className='grid grid-cols-6 gap-3 mt-10'>
                        <div className='col-span-4'>
                            <div className="card bg-base-100 shadow-sm rounded-2xl">
                                <figure>
                                    <img className='h-80 w-full object-cover'
                                        src={course.imageUrl}
                                        alt="course-image" />
                                </figure>
                                <div className="space-y-3 p-4">
                                    <h2 className="card-title">{course.title}</h2>
                                    <p>{course.description}</p>
                                    <div className='flex gap-3'>
                                        <p className='bg-violet-100 text-violet-600 inline px-3 py-1 rounded-full
                                    text-xs'>{course.category}</p>
                                        <p className='bg-orange-100 text-orange-600 inline px-3 py-1 rounded-full
                                    text-xs'>{course.batches[0].name}</p>
                                        <p className='bg-green-100 text-green-600 inline px-3 py-1 rounded-full
                                    text-xs'>$ {course.price}</p>
                                    </div>
                                    <p className='flex items-center gap-2'><MdUpdate />Start date: {course.batches[0].startDate
                                        ? new Date(course.batches[0].startDate).toISOString().split("T")[0]
                                        : ""}</p>
                                    <p className='flex items-center gap-2'><MdUpdateDisabled />End date: {course.batches[0].endDate
                                        ? new Date(course.batches[0].startDate).toISOString().split("T")[0]
                                        : ""}</p>

                                    <ul className="p-5 list-disc list-inside text-gray-700 space-y-2 leading-relaxed marker:text-emerald-600">
                                        <p className='font-bold text-lg'>Syllabus</p>
                                        {course.syllabus
                                            ?.split("\n")
                                            .filter((req) => req.trim() !== "")
                                            .map((req, index) => (
                                                <li key={index}>{req.trim()}</li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='items-start col-span-2'>
                            <div className='sticky top-20'>
                                <div className='p-5 shadow-md rounded-2xl space-y-4'>
                                    <h4 className='text-xl font-semibold pb-3'>Pricing Summary</h4>
                                    <div className='flex justify-between border-b pb-2 border-gray-200'>
                                        <p>Course Price</p>
                                        <p>${course.price}</p>
                                    </div>
                                    <div className='flex justify-between border-b pb-2 border-gray-200'>
                                        <p>Total Price</p>
                                        <p>${course.price}</p>
                                    </div>
                                    <div className='flex justify-between  mt-5'>
                                        <p>Total</p>
                                        <p className='font-bold text-2xl text-violet-500'>${course.price}</p>
                                    </div>
                                    <p className='border border-blue-300 bg-blue-50 text-blue-900 p-2 text-xs rounded-md'>
                                        ✓ 30-day money-back guarantee if you're not satisfied
                                    </p>
                                </div>

                                <div className='mt-5'>
                                    <button onClick={()=> navigate(`/course-payment/${id}`, {state: { course: course }   })} className='btn w-full mb-2 bg-blue-600 font-normal text-white
                                 rounded-lg'><CiCreditCard1 size={20} />Proceed to Payment</button>
                                    <button onClick={() => navigate(-1)} className='btn w-full mb-2 bg-linear-to-r from-indigo-500 to-violet-500 font-normal text-white
                                 rounded-lg'><IoIosArrowRoundBack size={20} />Back to Course</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CourseDetails;