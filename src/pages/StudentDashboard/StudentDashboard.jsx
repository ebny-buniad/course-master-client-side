import React from 'react';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from '../../Components/Container/Container';
import { Link } from 'react-router';
import { FaBookReader } from 'react-icons/fa';

const StudentDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: myCourses = [], isPending } = useQuery({
        queryKey: ['my-courses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/enrolled-courses?email=${user.email}`);
            return res.data.data;
        }
    })

    console.log(myCourses)

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <Container>
                <div className='py-20'>
                    <div className='mt-10 grid grid-cols-7 gap-5'>
                        <div className='col-span-5'>
                            <div className='flex items-center gap-3 shadow-md rounded-2xl p-6'>
                                <img className='w-20 h-20 object-cover rounded-full' src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                                <div className='space-y-3.5'>
                                    <h2 className='text-3xl font-semibold'>Welcome back, John Doe!</h2>
                                    <p>"Education is the most powerful weapon which you can use to change the world."</p>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-2xl font-semibold'>My Courses</h3>
                                    <Link className='btn' to='/'>View All Courses</Link>
                                </div>

                                <div className='mt-8 grid grid-cols-3 gap-5'>
                                    {
                                        myCourses.map((myCourse) => (
                                            <Link to={`/watch-class/${myCourse._id}`}>
                                                <div className="card bg-base-100 shadow-sm rounded-3xl cursor-pointer">
                                                    <figure>
                                                        <img className='h-40 w-full object-cover'
                                                            src={myCourse.imageUrl}
                                                            alt="course-img" />
                                                    </figure>
                                                    <div className="card-body space-y-2">
                                                        <h2 className="card-title">{myCourse.title}</h2>
                                                        <p>{myCourse.instructor}</p>
                                                        <p><progress className="progress progress-info w-56" value={50} max="100"></progress></p>
                                                        <div className="card-actions">
                                                            <button className="btn bg-blue-400 text-white font-normal rounded-xl
                                                         w-full">Continue Learning</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='col-span-2'>
                            <h3 className='text-2xl font-semibold mb-5'>Quick Stats</h3>
                            <div className='shadow p-6 rounded-2xl space-y-3'>
                                <div className='h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full'>
                                    <FaBookReader className='text-blue-500' />
                                </div>
                                <h2 className='font-bold text-2xl'>{myCourses.length}</h2>
                                <p>Courses Enrolled</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default StudentDashboard;