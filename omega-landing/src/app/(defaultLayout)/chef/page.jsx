import BreadCumb from '@/app/Components/Common/BreadCumb';
import Team4 from '@/app/Components/Team/Team4';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Chef"
            ></BreadCumb>
            <Team4></Team4>      
    </div>
  );
};

export default page;