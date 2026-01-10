import BreadCumb from '@/app/Components/Common/BreadCumb';
import Contact3 from '@/app/Components/Contact/Contact3';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Contact Us"
            ></BreadCumb> 
            <Contact3></Contact3>      
    </div>
  );
};

export default page;