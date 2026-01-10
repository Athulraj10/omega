import Image from "next/image";
import Link from "next/link";

const ShopListCard = ({img,title,content,price}) => {
    return (
        <div className="dishes-card style4 wow fadeInUp" data-wow-delay="0.2s">
        <div className="dishes-thumb">
        <Image src={img} alt="img" width={158} height={158}   />
            <div className="circle-shape"> <Image className="cir36"
                    src="/assets/img/food-items/circleShape.png" alt="img" width={174} height={174}   /></div>
        </div>
        <div className="dishes-content">
            <Link href="/shop/shop-details">
                <h3>{title}</h3>
            </Link>
            <div className="icon">
                <a href="#"> <i className="fa-regular fa-heart"></i></a>
            </div>
            <div className="star"> <Image src="/assets/img/icon/star2.svg" alt="img" width={86} height={16}   /></div>
            <div className="text">{content}</div>
            <h6>{price}</h6>
            <Link href="/shop/shop-details" className="theme-btn style6"> Order Now <i className="bi bi-basket2"></i></Link>
        </div>
    </div>
    );
};

export default ShopListCard;