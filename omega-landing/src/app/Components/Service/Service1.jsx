import Image from "next/image";
import Link from "next/link";

const Service1 = () => {

    const serviceItems = [
        {img:'/assets/img/icon/servicesIcon1_1.png', title:'Dining Guides', content:'Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.'},
        {img:'/assets/img/icon/servicesIcon1_2.png', title:'100% Fresh Food', content:'Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.'},
        {img:'/assets/img/icon/servicesIcon1_3.png', title:'Special Offers and Discounts', content:'Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.'},
        {img:'/assets/img/icon/servicesIcon1_4.png', title:'Restaurant Reviews', content:'Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.'},
        {img:'/assets/img/icon/servicesIcon1_5.png', title:'Food Testing Events', content:'Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.'},
        {img:'/assets/img/icon/servicesIcon1_6.png', title:'Online Ordering', content:'Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.'},
      ];   

    return (
        <div className="services-section style1 section-padding pb-0 fix">
        <div className="services-wrapper style2">
            <div className="container">
                <div className="row gy-5 gx-30">
                {serviceItems.map((item, i) => (
                    <div key={i} className="col-lg-4">
                        <div className="services-card style2">
                            <div className="services-card_icon">
                            <Image src={item.img} alt="img" width={40} height={40}   />
                            </div>
                            <h4 className="services-card_title">
                                <Link href="/service/service-details">{item.title}</Link>
                            </h4>
                            <p className="services-card_text">{item.content}</p>
                            <div className="shape1"><Image src="/assets/img/shape/servicesShape1_1.png" alt="img" width={104} height={95}   /></div>
                            <div className="shape2"><Image src="/assets/img/shape/servicesShape1_2.png" alt="img" width={58} height={44}   /></div>
                            <div className="shape3"><Image src="/assets/img/shape/servicesShape1_3.png" alt="img" width={104} height={95}   /></div>
                            <div className="shape4"><Image src="/assets/img/shape/servicesShape1_4.png" alt="img" width={58} height={44}   /></div>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </div>
    </div>
    );
};

export default Service1;