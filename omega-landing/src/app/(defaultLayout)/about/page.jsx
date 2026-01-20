import BreadCumb from '@/app/Components/Common/BreadCumb';
import CtaBanner1 from '@/app/Components/CtaBanner/CtaBanner1';
import Faq2 from '@/app/Components/Faq/Faq2';
import Testimonial1 from '@/app/Components/Testimonial/Testimonial1';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/aboutus profile.webp"
                Title="About Us"
            ></BreadCumb>
            <CtaBanner1></CtaBanner1>
            <Testimonial1></Testimonial1>
            <Faq2></Faq2>
    </div>
  );
};

export default page;