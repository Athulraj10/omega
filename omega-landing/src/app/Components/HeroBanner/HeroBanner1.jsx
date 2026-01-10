"use client"
import Link from "next/link";

const HeroBanner1 = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 1,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };  

    const heroContent = [
        {img:'/assets/img/banner/banner1.webp', subtitle:'WELCOME FRESHEAT', title:'SPICY FRIED CHICKEN', btnname:'ORDER NOW'},
      ]; 

    return (
        <div className="slider-area">
            <div className="swiper banner-slider">
                <div className="swiper-wrapper">

                {/* <Slider  {...settings}>  */}
                {heroContent.map((item, i) => (
                    <div key={i} className="swiper-slide">
                        <div className="banner-wrapper style1 bg-img">
                             {/* <div className="shape1_1 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_1.svg" alt="img" width={189} height={103}   /></div> 
                             <div className="shape1_2 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_2.svg" alt="img" width={189} height={209}   /></div>
                            <div className="shape1_3 d-none d-xxl-block" data-animation="slideInLeft" data-duration="3s"
                                data-delay="2s"><Image src="/assets/img/shape/bannerShape1_3.svg" alt="img" width={182} height={137}   /></div>
                            <div className="shape1_4 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_4.svg" alt="img" width={160} height={152}   /></div>
                            <div className="shape1_5 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_5.svg" alt="img" width={115} height={137}   /></div> */}
                            {/* <div className="shape1_6 d-none d-xxl-block cir36"><Image src="/assets/img/shape/bannerShape1_6.svg" alt="img" width={75} height={75}   /></div>  */}
                            <div className="overlay"></div>
                            <div className="banner-container">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-xl-6 d-none d-xxl-block order-1">
                                            <div className="banner-thumb-area" data-tilt data-animation="slideInLeft"
                                                data-duration="2s" data-delay=".9s">
                                            </div>
                                        </div>
                                        <div className="col-12 col-xxl-6 order-2">
                                            <div className="banner-title-area">
                                                <div className="banner-style1">
                                                    <div className="section-title">
                                                        <h6 className="sub-title" data-animation="slideInLeft"
                                                            data-duration="2s" data-delay=".3s"> {item.subtitle} </h6>
                                                        <h1 className="title" data-animation="slideInLeft"
                                                            data-duration="2s" data-delay=".5s">
                                                            {item.title}
                                                        </h1>
                                                        <Link className="theme-btn" href="/menu"
                                                            data-animation="slideInLeft" data-duration="2s"
                                                            data-delay=".7s">{item.btnname} <i className="bi bi-arrow-right"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    {/* </Slider> */}

                </div>

                {/* <div className="arrow-prev"><Image src="/assets/img/icon/arrowPrev.svg" alt="img" width={40} height={40}   /></div>
                <div className="arrow-next"><Image src="/assets/img/icon/arrowNext.svg" alt="img" width={40} height={40}   /></div>
                <div className="pagination-className swiper-pagination"></div> */}
            </div>
        </div>
    );
};

export default HeroBanner1;