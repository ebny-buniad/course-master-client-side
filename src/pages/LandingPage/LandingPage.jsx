import React from 'react';
import Hero from '../../Components/Hero/Hero';
import Courses from '../Courses/Courses';
import Footer from '../../Components/Footer/Footer';

const LandingPage = () => {
    return (
        <div>
            <Hero></Hero>
            <Courses></Courses>
            <Footer></Footer>
        </div>
    );
};

export default LandingPage;