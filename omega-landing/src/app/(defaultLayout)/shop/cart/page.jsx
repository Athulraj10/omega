import BreadCumb from '@/app/Components/Common/BreadCumb';
import Cart from '@/app/Components/Shop/Cart';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Cart"
            ></BreadCumb>    
            <Cart></Cart>         
    </div>
  );
};

export default page;