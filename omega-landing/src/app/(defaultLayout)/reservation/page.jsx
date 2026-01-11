import BreadCumb from '@/app/Components/Common/BreadCumb';
import Reservation from '@/app/Components/Reservation/Reservation';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Reservation"
            ></BreadCumb>      
            <Reservation></Reservation>  
    </div>
  );
};

export default page;