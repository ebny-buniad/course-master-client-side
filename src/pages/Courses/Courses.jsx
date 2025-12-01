import React from 'react';
import Container from '../../Components/Container/Container';
import { FaChevronDown } from 'react-icons/fa';

const Courses = () => {
    return (
        <div>
            <Container>
                <div className='grid grid-cols-8 gap-5 my-15'>
                    <div className='col-span-2'>
                        Filters
                    </div>
                    <div className='col-span-6 p-3 shadow rounded-2xl'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 className='text-2xl font-semibold'>All Courses</h2>
                                <p>We've 400 courses available!</p>
                            </div>
                            <div className='flex items-center gap-5 styled-select'>
                                <p>Sort by:</p>
                                <div className="relative w-52">
                                    {/* Select */}
                                    <select
                                        className="
                                        select w-full 
                                        appearance-none pr-10 
                                        focus:outline-none focus:border-violet-500
                                        border border-gray-300 rounded-lg
                                        "
                                    >
                                        <option>Select Price</option>
                                        <option>Low Price</option>
                                        <option>High Price</option>
                                    </select>

                                    {/* Custom Icon */}
                                    <FaChevronDown size={12} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Courses;