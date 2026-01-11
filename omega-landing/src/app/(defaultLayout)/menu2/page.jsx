// import BestSelling4 from '@/app/Components/BestSelling/BestSelling4';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import CtaBanner1 from '@/app/Components/CtaBanner/CtaBanner1';
import Testimonial2 from '@/app/Components/Testimonial/Testimonial2';
import React from 'react';

const page = () => {
  return (
    <div>
              <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Food Menu 2"
            ></BreadCumb>  
            {/* <BestSelling4></BestSelling4>   */}
            <CtaBanner1></CtaBanner1> 
            <Testimonial2></Testimonial2>      
    </div>
  );
};

export default page;