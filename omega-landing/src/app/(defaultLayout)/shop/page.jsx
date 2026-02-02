import BreadCumb from '@/app/Components/Common/BreadCumb';
import Shop1 from '@/app/Components/Shop/Shop1';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/bg/crabwhiteleg.webp"
                Title="Products"
            ></BreadCumb>  
            <Suspense fallback={<div>Loading...</div>}>
              <Shop1></Shop1>
            </Suspense>       
    </div>
  );
};

export default page;