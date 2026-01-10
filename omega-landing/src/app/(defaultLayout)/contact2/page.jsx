import BreadCumb from '@/app/Components/Common/BreadCumb';
import Contact4 from '@/app/Components/Contact/Contact4';
import React from 'react';

const page = () => {
  return (
    <div>
              <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Contact Us 2"
            ></BreadCumb>       
            <Contact4></Contact4>      
    </div>
  );
};

export default page;