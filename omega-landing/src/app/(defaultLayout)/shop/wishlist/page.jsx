import BreadCumb from '@/app/Components/Common/BreadCumb';
import Wishlist from '@/app/Components/Shop/Wishlist';
import React from 'react';

const page = () => {
  return (
    <div>
              <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Wishlist"
            ></BreadCumb>   
            <Wishlist></Wishlist>       
    </div>
  );
};

export default page;