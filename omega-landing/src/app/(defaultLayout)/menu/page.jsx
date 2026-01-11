import BreadCumb from '@/app/Components/Common/BreadCumb';
import FoodItem4 from '@/app/Components/FoodItem/FoodItem4';
import Gallery1 from '@/app/Components/Gallery/Gallery1';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Food Menu 1"
            ></BreadCumb>   
            <FoodItem4></FoodItem4>
            
            <Gallery1></Gallery1>       
    </div>
  );
};

export default page;