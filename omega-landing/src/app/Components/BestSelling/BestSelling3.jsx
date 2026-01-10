import Image from "next/image";
import Link from "next/link";

const BestSelling3 = () => {

    const foodItems = [
        {img:'/assets/img/dishes/dishes6_1.png', title:'Grilled Salmon', content:'The registration fee', price:'$24.00'},    
        {img:'/assets/img/dishes/dishes6_2.png', title:'Crab Cakes', content:'The registration fee', price:'$28.00'},    
        {img:'/assets/img/dishes/dishes6_3.png', title:'Fish and Chips', content:'The registration fee', price:'$20.00'},    
        {img:'/assets/img/dishes/dishes6_4.png', title:'Shrimp Scampi', content:'The registration fee', price:'$58.00'},       
      ]; 

    return (
        <section className="popular-dishes-section fix section-padding pb-0">
        <div className="popular-dishes-wrapper-container">
            <div className="container">
                <div className="popular-dishes-wrapper style4">
                    <div className="shape1 float-bob-x d-none d-xxl-block"><Image src="/assets/img/shape/dishesShape5_1.png" alt="img" width={101} height={79}   /></div>
                    <div className="container">
                        <div className="title-area mb-45">
                            <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                            <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                POPULAR DISHES<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                            </div>
                            <h2 className="title wow fadeInUp" data-wow-delay="0.7s"
                                >
                                Our Most Popular Deals
                            </h2>
                        </div>
                        <div className="dishes-card-wrap style4">
                        {foodItems.map((item, i) => (
                            <div  key={i} className="dishes-card style5 wow fadeInUp" data-wow-delay="0.4s">
                                <div className="dishes-thumb">
                                <Image src={item.img} alt="img" width={170} height={271}   />
                                </div>
                                <div className="dishes-content">
                                    <Link href="/menu">
                                        <h3>{item.title}</h3>
                                    </Link>
                                    <div className="star"><img src="/assets/img/icon/star2.svg" alt="icon" /></div>
                                    <div className="text">{item.content}</div>
                                    <h6>{item.price}</h6>
                                    <Link href="/menu" className="theme-btn style6"> Order Now <i className="bi bi-basket2"></i></Link>
                                </div>
                            </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    );
};

export default BestSelling3;