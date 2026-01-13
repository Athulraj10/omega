import Image from "next/image";
import Link from "next/link";

const ShopCard = ({img, title, content, price, productId}) => {
    const detailUrl = `/shop/shop-details?id=${productId}`;
    
    return (
        <div className="dishes-card style2 wow fadeInUp" data-wow-delay="0.2s">
            <div className="dishes-thumb">
                <Link href={detailUrl}>
                    <Image src={img} alt={title} width={158} height={158} style={{ cursor: 'pointer' }} />
                </Link>
                <div className="circle-shape">
                    <Image className="cir36" src="/assets/img/food-items/circleShape.png" alt="img" width={174} height={174} />
                </div>
            </div>
            <div className="dishes-content">
                <Link href={detailUrl}>
                    <h3>{title}</h3>
                </Link>
                <div className="star">
                    <Image src="/assets/img/icon/star2.svg" alt="img" width={86} height={16} />
                </div>
                <div className="text">{content}</div>
                <h6>{price}</h6>
                <Link href={detailUrl} className="theme-btn style6">
                    Order Now <i className="bi bi-basket2"></i>
                </Link>
            </div>
        </div>
    );
};

export default ShopCard;