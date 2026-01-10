import BestSelling1 from '@/app/Components/BestSelling/BestSelling1';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import ShopDetails from '@/app/Components/ShopDetails/ShopDetails';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Shop Details"
            ></BreadCumb>    
            <ShopDetails></ShopDetails>      
            <BestSelling1></BestSelling1>      
    </div>
  );
};

export default page;