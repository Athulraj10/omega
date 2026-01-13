"use client"
import BestSelling1 from '@/app/Components/BestSelling/BestSelling1';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import ShopDetails from '@/app/Components/ShopDetails/ShopDetails';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const page = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/breadcumb.jpg"
        Title="Shop Details"
      />
      <ShopDetails productId={productId} />
      <BestSelling1 />
    </div>
  );
};

export default page;