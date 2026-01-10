"use client"
import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";

const Testimonial2 = () => {

    const settings = {
            dots: false,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            swipeToSlide: true,
            autoplay: false,
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
    
          const sliderRef = useRef(null);
    
          const next = () => {
            sliderRef.current.slickNext();
          };
        
          const previous = () => {
            sliderRef.current.slickPrev();
          }; 


    const tesItems = [
        {img:'/assets/img/testimonial/testimonialProfile2_1.png', content:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock !'},
        {img:'/assets/img/testimonial/testimonialProfile2_2.png', content:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock !'},
        {img:'/assets/img/testimonial/testimonialProfile2_3.png', content:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock !'},
      ]; 

    return (
        <section className="testimonial-section fix section-padding bg-white">
        <div className="vagetable-shape">
        <Image src="/assets/img/testimonial/vagetable-shape.png" alt="img" width={150} height={253}   />
        </div>
        <div className="chili-shape">
        <Image src="/assets/img/testimonial/chili-shape.png" alt="img" width={239} height={149}   />
        </div>
        <div className="testimonial-wrapper style2">
            <div className="container">

                <div className="testimonial-wrap style2">
                    <div className="row gx-80 gy-5">
                        <div className="col-xl-7 order-2 order-xl-1">
                            <div className="title-area">
                                <div className="sub-title text-start wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                    TESTIMONIALS<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                </div>
                                <h2 className="title  text-start wow fadeInUp" data-wow-delay="0.7s">
                                    what have lots of happy customer feedback
                                </h2>
                            </div>

                            <div className="slider-area">
                                <div className="swiper testimonialSliderTwo">
                                    <div className="swiper-wrapper">
                                    <Slider ref={sliderRef} {...settings}>
                                    {tesItems.map((item, i) => (
                                        <div key={i} className="swiper-slide">
                                            <div className="testimonial-card style2">
                                                <div className="quote"><Image src="/assets/img/icon/quote.svg" alt="img" width={50} height={37}   />
                                                </div>
                                                <p>{item.content}</p>
                                                <div className="profile-box">
                                                    <div className="one"><Image src={item.img} alt="img" width={81} height={89}   /></div>
                                                </div>
                                            </div>
                                        </div>
                                ))}
                                </Slider>

                                    </div>

                                    <div className="btn-wrap">
                                        <div onClick={previous} className="arrow-prev"><i className="bi bi-arrow-left"></i></div>
                                        <div onClick={next} className="arrow-next"><i className="bi bi-arrow-right"></i></div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="col-xl-5 order-1 order-xl-2">
                            <div className="testimonial-thumb">
                            <Image src="/assets/img/testimonial/testimonialThumb2_1.png" alt="img" width={561} height={547}   />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    );
};

export default Testimonial2;