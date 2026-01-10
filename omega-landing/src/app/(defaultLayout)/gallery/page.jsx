import BreadCumb from '@/app/Components/Common/BreadCumb';
import Gallery2 from '@/app/Components/Gallery/Gallery2';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Gallery"
            ></BreadCumb>   
            <Gallery2></Gallery2>       
    </div>
  );
};

export default page;