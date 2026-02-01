import React from 'react';
import HeroBanner1 from '../Components/HeroBanner/HeroBanner1';
import FoodItems1 from '../Components/FoodItems/FoodItems1';
import Offer1 from '../Components/Offer/Offer1';
import About1 from '../Components/About/About1';
import BestSelling1 from '../Components/BestSelling/BestSelling1';
import CtaBanner1 from '../Components/CtaBanner/CtaBanner1';
import FoodItem1 from '../Components/FoodItem/FoodItem1';
import Timer1 from '../Components/Timer/Timer1';
import Team1 from '../Components/Team/Team1';
import Testimonial1 from '../Components/Testimonial/Testimonial1';
import Blog1 from '../Components/Blog/Blog1';
// import Gallery1 from '../Components/Gallery/Gallery1';

const page = () => {
    return (
        <div className='bg-color2'>
            <HeroBanner1></HeroBanner1>
            <FoodItems1></FoodItems1>
            <About1></About1>
            <Team1></Team1>
            <CtaBanner1></CtaBanner1>
            <FoodItem1></FoodItem1>
            <Offer1></Offer1>
            <Testimonial1></Testimonial1>
            <Blog1></Blog1>
        </div>
    );
};

export default page;