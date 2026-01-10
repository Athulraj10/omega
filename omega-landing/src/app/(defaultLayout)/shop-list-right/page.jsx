import BreadCumb from '@/app/Components/Common/BreadCumb';
import ShopListRight from '@/app/Components/Shop/ShopListRight';
import React from 'react';

const page = () => {
  return (
    <div>
              <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Shop List Right Sidebar"
            ></BreadCumb>      
            <ShopListRight></ShopListRight>       
    </div>
  );
};

export default page;