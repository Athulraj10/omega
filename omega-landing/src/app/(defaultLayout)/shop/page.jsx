import BreadCumb from '@/app/Components/Common/BreadCumb';
import Shop1 from '@/app/Components/Shop/Shop1';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Shop"
            ></BreadCumb>  
            <Shop1></Shop1>       
    </div>
  );
};

export default page;