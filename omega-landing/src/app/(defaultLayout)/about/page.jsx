import BreadCumb from '@/app/Components/Common/BreadCumb';
import CtaBanner1 from '@/app/Components/CtaBanner/CtaBanner1';
import Gallery1 from '@/app/Components/Gallery/Gallery1';
import Testimonial2 from '@/app/Components/Testimonial/Testimonial2';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="About Us"
            ></BreadCumb>
            <CtaBanner1></CtaBanner1>
            <Testimonial2></Testimonial2>
            <Gallery1></Gallery1>            
    </div>
  );
};

export default page;