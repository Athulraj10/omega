import Image from "next/image";
import Link from "next/link";

const ShopCard = ({ img, title, content, price, productId }) => {
    const detailUrl = `/shop/shop-details?id=${productId}`;

    return (
        <div className="single-food-items">
            <div className="item-thumb">
                <Link href={detailUrl}>
                    <Image
                        src={img}
                        width={500}
                        height={500}
                        alt={title}
                        className="food-item-img"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "0%",
                            cursor: "pointer",
                        }}
                    />
                </Link>
            </div>
            <div className="item-content">
                <Link href={detailUrl} style={{ textDecoration: "none" }}>
                    <h3>{title}</h3>
                </Link>
                <div className="text">{content}</div>
                {price && <h6>{price}</h6>}
            </div>
        </div>
    );
};

export default ShopCard;