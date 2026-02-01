"use client";
import Image from "next/image";
import Link from "next/link";

const FoodItemCard = ({ img, title, content, price, productId }) => {
  const detailUrl = productId ? `/shop/shop-details?id=${productId}` : "/shop";

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .food-item-card {
          padding: 12px !important;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .food-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        @media (min-width: 375px) {
          .food-item-card {
            padding: 14px !important;
            border-radius: 10px;
          }
        }
        @media (min-width: 576px) {
          .food-item-card {
            padding: 16px !important;
            border-radius: 12px;
          }
        }
        @media (min-width: 768px) {
          .food-item-card {
            padding: 18px !important;
          }
        }
        @media (min-width: 992px) {
          .food-item-card {
            padding: 20px !important;
          }
        }
        .food-item-card .details {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        @media (min-width: 375px) {
          .food-item-card .details {
            gap: 12px;
            flex-wrap: nowrap;
          }
        }
        @media (min-width: 576px) {
          .food-item-card .details {
            gap: 16px;
          }
        }
        @media (min-width: 768px) {
          .food-item-card .details {
            gap: 20px;
          }
        }
        @media (min-width: 992px) {
          .food-item-card .details {
            gap: 24px;
          }
        }
        .food-item-card .menu-item-thumb {
          flex-shrink: 0;
          width: 80px;
          height: 60px;
          position: relative;
          overflow: hidden;
          border-radius: 6px;
        }
        @media (min-width: 375px) {
          .food-item-card .menu-item-thumb {
            width: 100px;
            height: 70px;
            border-radius: 8px;
          }
        }
        @media (min-width: 576px) {
          .food-item-card .menu-item-thumb {
            width: 120px;
            height: 80px;
            border-radius: 10px;
          }
        }
        @media (min-width: 768px) {
          .food-item-card .menu-item-thumb {
            width: 140px;
            height: 90px;
          }
        }
        @media (min-width: 992px) {
          .food-item-card .menu-item-thumb {
            width: 170px;
            height: 110px;
          }
        }
        .food-item-card .menu-item-thumb img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          border-radius: inherit;
        }
        .food-item-card .menu-content {
          flex: 1;
          min-width: 0;
          width: 100%;
        }
        @media (min-width: 375px) {
          .food-item-card .menu-content {
            width: auto;
          }
        }
        .food-item-card .menu-content h4 {
          font-size: 14px !important;
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 4px;
          color: #0D5189 !important;
          word-wrap: break-word;
        }
        @media (min-width: 375px) {
          .food-item-card .menu-content h4 {
            font-size: 15px !important;
            margin-bottom: 5px;
          }
        }
        @media (min-width: 576px) {
          .food-item-card .menu-content h4 {
            font-size: 16px !important;
            margin-bottom: 6px;
          }
        }
        @media (min-width: 768px) {
          .food-item-card .menu-content h4 {
            font-size: 17px !important;
            margin-bottom: 8px;
          }
        }
        @media (min-width: 992px) {
          .food-item-card .menu-content h4 {
            font-size: 18px !important;
            margin-bottom: 10px;
          }
        }
        .food-item-card .menu-content p {
          font-size: 11px !important;
          line-height: 1.4;
          margin-bottom: 6px;
          color: #0D5189 !important;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (min-width: 375px) {
          .food-item-card .menu-content p {
            font-size: 12px !important;
            margin-bottom: 8px;
            -webkit-line-clamp: 2;
          }
        }
        @media (min-width: 576px) {
          .food-item-card .menu-content p {
            font-size: 13px !important;
            margin-bottom: 10px;
            -webkit-line-clamp: 3;
          }
        }
        @media (min-width: 768px) {
          .food-item-card .menu-content p {
            font-size: 14px !important;
            -webkit-line-clamp: 3;
          }
        }
        @media (min-width: 992px) {
          .food-item-card .menu-content p {
            font-size: 14px !important;
            -webkit-line-clamp: 4;
          }
        }
        .food-item-card .menu-content h6 {
          font-size: 13px !important;
          font-weight: 700;
          margin-top: 4px;
          margin-bottom: 0;
          color: #0D5189 !important;
        }
        @media (min-width: 375px) {
          .food-item-card .menu-content h6 {
            font-size: 14px !important;
            margin-top: 6px;
          }
        }
        @media (min-width: 576px) {
          .food-item-card .menu-content h6 {
            font-size: 15px !important;
            margin-top: 8px;
          }
        }
        @media (min-width: 768px) {
          .food-item-card .menu-content h6 {
            font-size: 16px !important;
            margin-top: 10px;
          }
        }
        @media (min-width: 992px) {
          .food-item-card .menu-content h6 {
            font-size: 18px !important;
          }
        }
        .food-item-card .menu-content a {
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .food-item-card .menu-content a:hover {
          opacity: 0.8;
        }
        .food-item-card .menu-item-thumb a {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}} />
      <div className="single-menu-items food-item-card">
        <div className="details">
          {/* Image */}
          <div className="menu-item-thumb">
            <Link href={detailUrl}>
              <Image
                src={img}
                alt={title}
                width={170}
                height={110}
                className="img-fluid"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 374px) 80px, (max-width: 575px) 100px, (max-width: 767px) 120px, (max-width: 991px) 140px, 170px"
              />
            </Link>
          </div>

          {/* Content */}
          <div className="menu-content">
            <Link href={detailUrl}>
              <h4>{title}</h4>
            </Link>
            <p>{content}</p>
            {/* <h6>{price}</h6> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodItemCard;
