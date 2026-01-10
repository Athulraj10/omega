import BreadCumb from '@/app/Components/Common/BreadCumb';
import Testimonial1 from '@/app/Components/Testimonial/Testimonial1';
import Testimonial4 from '@/app/Components/Testimonial/Testimonial4';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Testimonial"
            ></BreadCumb>    
            <Testimonial4></Testimonial4> 
            <Testimonial1></Testimonial1>        
    </div>
  );
};

export default page;