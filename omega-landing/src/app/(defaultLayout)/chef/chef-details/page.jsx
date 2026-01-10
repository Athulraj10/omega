import ChefDetails1 from '@/app/Components/ChefDetails/ChefDetails1';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import Team5 from '@/app/Components/Team/Team5';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Chef Details 1"
            ></BreadCumb>
            <ChefDetails1></ChefDetails1> 
            <Team5></Team5>        
    </div>
  );
};

export default page;