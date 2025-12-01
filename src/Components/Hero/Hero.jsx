import React from "react";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
    return (
        <section
            className="w-full py-20 px-4 text-center"
            style={{
                background: "linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, rgba(252, 242, 255, 1) 100%)",
            }}
        >
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-15">
                Learn Without Limits
            </h1>

            {/* Subheading */}
            <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Discover thousands of courses from world-class instructors and elevate your
                skills
            </p>

            {/* Search Box */}
            <div className="flex justify-center">
                <div className="bg-white shadow-md rounded-full p-2 flex items-center w-full max-w-2xl">
                    <FiSearch className="text-gray-400 text-xl ml-3" />
                    <input
                        type="text"
                        placeholder="Search for courses, instructors, or topics..."
                        className="input input-ghost w-full px-4 focus:outline-none placeholder-gray-400"
                    />
                    <button className="btn rounded-full bg-purple-600 hover:bg-purple-700 text-white px-6">
                        Search
                    </button>
                </div>
            </div>

            {/* Popular Tags */}
            <div className="mt-6 flex justify-center items-center gap-3 flex-wrap">
                <span className="text-gray-600 font-medium">Popular:</span>

                <button className="btn btn-sm p-5 rounded-full bg-white text-gray-700 hover:bg-gray-100">
                    Web Development
                </button>

                <button className="btn btn-sm p-5 rounded-full bg-white text-gray-700 hover:bg-gray-100">
                    Data Science
                </button>

                <button className="btn btn-sm p-5 rounded-full bg-white text-gray-700 hover:bg-gray-100">
                    Design
                </button>

                <button className="btn btn-sm p-5 rounded-full bg-white text-gray-700 hover:bg-gray-100">
                    Business
                </button>
            </div>
        </section>
    );
};

export default Hero;
