import BreadCumb from '@/app/Components/Common/BreadCumb';
import Testimonial1 from '@/app/Components/Testimonial/Testimonial1';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Testimonial"
            ></BreadCumb>    
            <Testimonial1></Testimonial1>        
    </div>
  );
};

export default page;