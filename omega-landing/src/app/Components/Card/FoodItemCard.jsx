import Image from "next/image";
import Link from "next/link";

const FoodItemCard = ({img, title, content, price, productId}) => {
    const detailUrl = productId ? `/shop/shop-details?id=${productId}` : "/shop";
    
    return (
        <div className="single-menu-items border border-gray-200 rounded-lg">
            <div className="details">
                <div className="menu-item-thumb">
                    <Link href={detailUrl}>
                        <Image 
                            src={img} 
                            alt={title} 
                            width={170} 
                            height={130}
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>
                </div>
                <div className="menu-content">
                    <Link href={detailUrl}>
                        <h3>{title}</h3>
                    </Link>
                    <p>{content}</p>
                </div>
            </div>
            <h6>{price}</h6>
        </div>
    );
};

export default FoodItemCard;