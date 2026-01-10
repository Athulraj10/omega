import BreadCumb from '@/app/Components/Common/BreadCumb';
import Checkout from '@/app/Components/Shop/Checkout';
import React from 'react';

const page = () => {
  return (
    <div>
              <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Checkout"
            ></BreadCumb>   
            <Checkout></Checkout>       
    </div>
  );
};

export default page;