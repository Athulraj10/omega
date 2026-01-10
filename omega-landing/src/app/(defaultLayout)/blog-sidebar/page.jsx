import Blog5 from '@/app/Components/Blog/Blog5';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import React from 'react';

const page = () => {
  return (
    <div>
              <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Blog Left Sidebar"
            ></BreadCumb>
            <Blog5></Blog5>       
    </div>
  );
};

export default page;