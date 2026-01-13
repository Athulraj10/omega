"use client"
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const Team1 = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 6,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 4,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      }; 

    const teamItems = [
      {img:'/assets/img/chefe/chefeThumb1_3.png', title:'Fresh Fish', content:'Chef Assistant', facebook:'#', linkedin:'#'},
      {img:'/assets/img/chefe/chefeThumb1_2.png', title:'Frozen Fish', content:'Chef Assistant', facebook:'#', linkedin:'#'},
      {img:'/assets/img/chefe/chefeThumb1_1.png', title:'Powered by IOT', content:'Chef Lead', facebook:'#', linkedin:'#'},
      ]; 

      const logoItems = [
        {img:'/assets/img/logo/clientLogo1_1.png'},
        {img:'/assets/img/logo/clientLogo1_2.png'},
        {img:'/assets/img/logo/clientLogo1_3.png'},
        {img:'/assets/img/logo/clientLogo1_4.png'},
        {img:'/assets/img/logo/clientLogo1_5.png'},
        {img:'/assets/img/logo/clientLogo1_6.png'},
        {img:'/assets/img/logo/clientLogo1_1.png'},
        {img:'/assets/img/logo/clientLogo1_2.png'},        
      ]; 

    return (
<section className="chefe-section fix p-3 border border-blue-300">
        <div className="chefe-wrapper style1">
            <div className="shape1 d-none d-xxl-block"><Image className="float-bob-y" src="/assets/img/shape/chefeShape1_1.png" alt="img" width={167} height={132}   /></div>
            <div className="shape2 d-none d-xxl-block"><Image className="float-bob-x" src="/assets/img/shape/chefeShape1_2.png" alt="img" width={142} height={90}   /></div>
            <div className="container">
                <div className="title-area">
                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                    {/* <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   /> */}
                        We offer the best
                        {/* <Image className="ms-1"
                            src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   /> */}
                    </div>
                    <h2 className="title  wow fadeInUp" data-wow-delay="0.7s">
                        Quality food and service categories
                    </h2>
                </div>
                <div className="pb-5">
                    <div className="row">
                    {teamItems.map((item, i) => (
                        <div key={i} className="col-lg-6 col-xl-4">
                            <div className="" data-wow-delay="0.2s">
                                <div className="">
                                <Image src={item.img} className="shadow rounded-3" alt="img" width={400} height={300} />
                                </div>
                              <div className="mt-3 justify-content-center chefe-content">
                                        <h3 className="text-center">{item.title}</h3>
                                    {/* <div className="text-center" style={{ fontSize: '14px' }}>{item.content}</div> */}
                                </div>
                            </div>
                        </div>
                        ))}

                    </div>
                </div>
                <div className="slider-area pt-5 mt-4 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="swiper clientSliderOne">
                        <div className="swiper-wrapper">
                        <Slider {...settings}>
                        {logoItems.map((item, i) => (
                            <div key={i} className="swiper-slide">
                                <div className="client-img text-center"><img src={item.img} alt="thumb" />
                                </div>
                            </div>
                        ))}
                        </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Team1;