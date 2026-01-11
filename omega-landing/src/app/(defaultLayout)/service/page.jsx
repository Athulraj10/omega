import BreadCumb from '@/app/Components/Common/BreadCumb';
import Gallery1 from '@/app/Components/Gallery/Gallery1';
import Service1 from '@/app/Components/Service/Service1';
import React from 'react';

const page = () => {
  return (
    <div>
        <BreadCumb
          bgimg="/assets/img/bg/breadcumb.jpg"
          Title="Services"
      ></BreadCumb> 
      <Service1></Service1>  
      <Gallery1></Gallery1>           
    </div>
  );
};

export default page;