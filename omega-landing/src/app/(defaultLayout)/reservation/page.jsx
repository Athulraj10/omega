import BreadCumb from '@/app/Components/Common/BreadCumb';
import Reservation from '@/app/Components/Reservation/Reservation';
import Team5 from '@/app/Components/Team/Team5';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Reservation"
            ></BreadCumb>      
            <Reservation></Reservation>  
            <Team5></Team5>       
    </div>
  );
};

export default page;