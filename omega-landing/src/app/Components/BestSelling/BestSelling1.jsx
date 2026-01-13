import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "../../../data/products";

const BestSelling1 = () => {
    // Get all products and select first 5 as best selling
    const allProducts = getAllProducts();
    const foodItems = allProducts.slice(5, 10); 

    return (
        <section className="popular-dishes-section fix section-padding border border-2 border-gray-300" style={{ backgroundColor: 'white' }}>
        <div className="popular-dishes-wrapper style1">
            <div className="shape1 d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_1.png" alt="img" width={164} height={183}   />
            </div>
            <div className="shape2 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_2.png" alt="img" width={250} height={199}   /></div>
            <div className="container">
                <div className="title-area">
                
                    <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                        Best selling Dishes
                    </h2>
                </div>
                <div className="dishes-card-wrap style1">
                {foodItems.map((item, i) => {
                    const detailUrl = `/shop/shop-details?id=${item.id}`;
                    return (
                    <div key={item.id || i} className="dishes-card style1 wow fadeInUp border border-2 border-gray-300" data-wow-delay="0.2s" style={{ backgroundColor: '#fff' }} >
                        
                        <div className="dishes-thumb">
                            <Link href={detailUrl}>
                                <Image src={item.img} alt={item.title} width={158} height={158} style={{ cursor: 'pointer' }} />
                            </Link>
                        </div>
                        <Link href={detailUrl}>
                            <h3>{item.title}</h3>
                        </Link>
                        <p>{item.content}</p>
                        <h6>{item.price}</h6>
                        <div className="social-profile">
                            {/* <span className="plus-btn"> <Link href="/shop/wishlist"> <i className="bi bi-heart"></i></Link></span>
                            <ul>
                                <li><Link href="/shop/cart"><i className="bi bi-basket2"></i></Link></li>
                            </ul> */}
                        </div>
                    </div>
                    );
                })}
                </div>
                <div className="btn-wrapper  wow fadeInUp" data-wow-delay="0.9s">
                    <Link className="theme-btn" href="/shop">VIEW ALL ITEM <i className="bi bi-arrow-right"></i></Link>
                </div>
            </div>
        </div>

    </section>

    );
};

export default BestSelling1;