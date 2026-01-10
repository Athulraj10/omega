import Image from "next/image";
import Link from "next/link";

const Team2 = () => {

    const teamItems = [
        {img:'/assets/img/chefe/chefeThumb2_1.jpg', title:'Devon Lane', content:'President of Sales', facebook:'#', linkedin:'#', youtube:'#'},
        {img:'/assets/img/chefe/chefeThumb2_2.jpg', title:'Ralph Edwards', content:'Chefe Manager', facebook:'#', linkedin:'#', youtube:'#'},
        {img:'/assets/img/chefe/chefeThumb2_3.jpg', title:'Marvin McKinney', content:'Main Chefe', facebook:'#', linkedin:'#', youtube:'#'},
      ]; 

    return (
        <section className="chefe-section fix section-padding pt-0">
        <div className="chefe-wrapper style1">
            <div className="shape1 d-none d-xxl-block"><Image className="float-bob-y" src="/assets/img/shape/chefeShape2_1.png" alt="img" width={153} height={160}   /></div>
            <div className="shape2 d-none d-xxl-block"><Image className="float-bob-x" src="/assets/img/shape/chefeShape2_2.png" alt="img" width={255} height={302}   /></div>
            <div className="container">
                <div className="title-area">
                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                    <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                       OUR CHEFE<Image className="ms-1"
                            src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                    </div>
                    <h2 className="title  wow fadeInUp" data-wow-delay="0.7s">
                        Meet Our Expert Chefe
                    </h2>
                </div>
                <div className="chefe-card-wrap style1 pb-5">
                    <div className="row gy-5 gx-80">

                    {teamItems.map((item, i) => (
                        <div key={i} className="col-md-6 col-xl-4">
                            <div className="chefe-card style2 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="chefe-thumb">
                                <Image src={item.img} alt="img" width={379} height={413}   />
                                </div>
                                <div className="icon">
                                    <span>Share</span>
                                    <a href={item.facebook}><i className="bi bi-facebook"></i></a>
                                    <a href={item.youtube}><i className="bi bi-youtube"></i></a>
                                    <a href={item.linkedin}><i className="bi bi-linkedin"></i></a>
                                </div>
                                <div className="chefe-content">
                                    <Link href="/chef/chef-details">
                                        <h3>{item.title}</h3>
                                    </Link>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Team2;