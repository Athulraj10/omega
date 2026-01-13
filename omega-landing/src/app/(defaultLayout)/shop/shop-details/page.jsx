"use client"
import BestSelling1 from '@/app/Components/BestSelling/BestSelling1';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import ShopDetails from '@/app/Components/ShopDetails/ShopDetails';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const ShopDetailsContent = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  return <ShopDetails productId={productId} />;
};

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/breadcumb.jpg"
        Title="Shop Details"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ShopDetailsContent />
      </Suspense>
      <BestSelling1 />
    </div>
  );
};

export default page;