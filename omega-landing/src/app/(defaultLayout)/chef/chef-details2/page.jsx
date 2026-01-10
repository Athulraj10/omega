import ChefDetails2 from '@/app/Components/ChefDetails/ChefDetails2';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import Team5 from '@/app/Components/Team/Team5';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Chef Details 2"
            ></BreadCumb> 
            <ChefDetails2></ChefDetails2> 
            <Team5></Team5>       
    </div>
  );
};

export default page;