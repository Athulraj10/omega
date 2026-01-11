import Image from "next/image";
import Link from "next/link";

const FoodItemCard = ({img,title,content,price}) => {
    return (
        <div className="single-menu-items border border-gray-200 rounded-lg">
        <div className="details">
            <div className="menu-item-thumb">
                <Image src={img} alt="img" width={180} height={140}   />
                </div>
            <div className="menu-content">
                <Link href="/menu">
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