import Image from "next/image";
import Link from "next/link";

const BestSelling2 = () => {

    const foodItems = [
        {img:'/assets/img/dishes/dishes2_1.png', title:'Chicken Pizza', content:'The registration fee', price:'$24.00'},    
        {img:'/assets/img/dishes/dishes2_2.png', title:'Egg and Cucumber', content:'The registration fee', price:'$28.00'},    
        {img:'/assets/img/dishes/dishes2_3.png', title:'Chicken Fried Rice', content:'The registration fee', price:'$20.00'},    
        {img:'/assets/img/dishes/dishes2_4.png', title:'Chicken Leg Piece', content:'The registration fee', price:'$58.00'},    
        {img:'/assets/img/dishes/dishes2_5.png', title:'Chinese Pasta', content:'The registration fee', price:'$70.00'},    
      ]; 

    return (
        <section className="popular-dishes-section fix section-padding pt-0">
        <div className="popular-dishes-wrapper-container">
            <div className="container">
                <div className="popular-dishes-wrapper style2 section-padding bg-white ">
                    <div className="shape1 float-bob-x d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_1.png" alt="img" width={164} height={183}   /></div>
                    <div className="shape2 float-bob-x d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_2.png" alt="img" width={239} height={149}   /></div>
                    <div className="container">
                        <div className="title-area">
                            <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                            <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                POPULAR DISHES<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                            </div>
                            <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                                Our Most Popular Deals
                            </h2>
                        </div>
                        <div className="dishes-card-wrap style1 mb-60">
                        {foodItems.map((item, i) => (
                            <div key={i} className="dishes-card style2 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="dishes-thumb">
                                    <img src={item.img} alt="thumb" />
                                    <div className="circle-shape"><Image className="cir36"
                                            src="/assets/img/food-items/circleShape.png" alt="img" width={158} height={158}   /></div>
                                </div>
                                <div className="dishes-content">
                                    <Link href="/menu">
                                        <h3>{item.title}</h3>
                                    </Link>
                                    <div className="star"><Image src="/assets/img/icon/star2.svg" alt="img" width={86} height={16}   /></div>
                                    <div className="text">{item.content}</div>
                                    <h6>{item.price}</h6>
                                    <Link href="/menu" className="theme-btn style6"> Order Now <i className="bi bi-basket2"></i></Link>
                                </div>
                            </div>
                             ))}
                        </div>
                        <div className="btn-wrapper">
                            <Link className="theme-btn" href="/menu"> VIEW ALL ITEM <i className="bi bi-arrow-right"></i></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </section>
    );
};

export default BestSelling2;