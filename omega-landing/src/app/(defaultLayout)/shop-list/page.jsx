import BreadCumb from '@/app/Components/Common/BreadCumb';
import ShopList from '@/app/Components/Shop/ShopList';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Shop List"
            ></BreadCumb>        
            <ShopList></ShopList>        
    </div>
  );
};

export default page;