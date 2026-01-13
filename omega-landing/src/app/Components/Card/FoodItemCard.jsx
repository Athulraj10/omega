import Image from "next/image";
import Link from "next/link";

const FoodItemCard = ({ img, title, content, price, productId }) => {
  const detailUrl = productId ? `/shop/shop-details?id=${productId}` : "/shop";

  return (
    <div className="single-menu-items border border-gray-200 rounded-lg p-4">
      <div className="details flex items-center gap-4">
        {/* Image */}
        <div className="menu-item-thumb flex-shrink-0">
          <Link href={detailUrl}>
            <Image
              src={img}
              alt={title}
              width={170}
              height={130}
              className="cursor-pointer rounded"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="menu-content">
          <Link href={detailUrl}>
            <h4 className="font-semibold text-lg">{title}</h4>
          </Link>
          <p className="text-sm text-gray-600">{content}</p>
          <h6 className="font-bold mt-1">{price}</h6>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
