import Image from "next/image";
import Link from "next/link";

const BestSelling1 = () => {

    const foodItems = [
        {img:'/assets/img/dishes/dishes1_1.png', title:'Chicken Fried Rice', content:'The registration fee', price:'$100.99'},    
        {img:'/assets/img/dishes/dishes1_2.png', title:'Chinese Pasta', content:'The registration fee', price:'$15.99'},    
        {img:'/assets/img/dishes/dishes1_3.png', title:'Chicken Pizza', content:'The registration fee', price:'$26.99'},    
        {img:'/assets/img/dishes/dishes1_4.png', title:'Chicken Noodles', content:'The registration fee', price:'$39.00'},    
        {img:'/assets/img/dishes/dishes1_5.png', title:'Grilled Chicken', content:'The registration fee', price:'$20.99'},    
      ]; 

    return (
        <section className="popular-dishes-section fix section-padding">
        <div className="popular-dishes-wrapper style1">
            <div className="shape1 d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_1.png" alt="img" width={164} height={183}   />
            </div>
            <div className="shape2 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_2.png" alt="img" width={250} height={199}   /></div>
            <div className="container">
                <div className="title-area">
                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                    <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                        POPULAR DISHES<Image className="ms-1"
                            src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                    </div>
                    <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                        Best selling Dishes
                    </h2>
                </div>
                <div className="dishes-card-wrap style1">
                {foodItems.map((item, i) => (
                    <div key={i} className="dishes-card style1 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="dishes-thumb">
                        <Image src={item.img} alt="img" width={158} height={158}   />
                        </div>
                        <Link href="/menu">
                            <h3>{item.title}</h3>
                        </Link>
                        <p>{item.content}</p>
                        <h6>{item.price}</h6>
                        <div className="social-profile">
                            <span className="plus-btn"> <Link href="/shop/wishlist"> <i className="bi bi-heart"></i></Link></span>
                            <ul>
                                <li><Link href="/shop/cart"><i className="bi bi-basket2"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="btn-wrapper  wow fadeInUp" data-wow-delay="0.9s">
                    <Link className="theme-btn" href="/menu2">VIEW ALL ITEM <i className="bi bi-arrow-right"></i></Link>
                </div>
            </div>
        </div>

    </section>

    );
};

export default BestSelling1;