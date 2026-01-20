"use client"
import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import VideoModal from "../VideoModal/VideoModal";
import Image from "next/image";

const Testimonial1 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const testimonialRef = useRef(null);
    const lastScrollY = useRef(0);

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

        const [iframeSrc, setIframeSrc] = useState('about:blank');
        const [toggle, setToggle] = useState(false);
      
        const handelClick = () => {
          setIframeSrc("https://www.youtube.com/embed/rRid6GCJtgc");
          setToggle(!toggle);
        };
        const handelClose = () => {
          setIframeSrc('about:blank');
          setToggle(!toggle);
        };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY.current) {
                setScrollDirection('up');
            }
            
            lastScrollY.current = currentScrollY;
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setIsVisible(true);
                        }, 10);
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const currentRef = testimonialRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const tesItems = [
        {img:'/assets/img/testimonial/testimonialProfile1_1.png', title:'Al Mansoor', designation:'', content:'we are very happy with the quality of the products and the service we received from Omega Foods'},
        {img:'/assets/img/testimonial/testimonialProfile1_1.png', title:'Shahid Jafrial', designation:'', content:'Fresh and healthy products, delivered on time'},
        {img:'/assets/img/testimonial/testimonialProfile1_1.png', title:'Diya ', designation:'', content:'Excellent customer service and a wide variety of products'},
      ]; 

    return (
    <>
        <style dangerouslySetInnerHTML={{__html: `
            .testimonial-image-wrapper {
                border-radius: 20px !important;
                overflow: hidden !important;
                position: relative !important;
            }
            .testimonial-image-wrapper img,
            .testimonial-image-wrapper picture,
            .testimonial-image-wrapper picture img {
                border-radius: 20px !important;
            }
            .testimonial-section .testimonial-left {
                opacity: 0;
                transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                transform: translateX(-50px);
            }
            .testimonial-section .testimonial-left.animate-from-left {
                opacity: 1;
                transform: translateX(0);
            }
            .testimonial-section .testimonial-right {
                opacity: 0;
                transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                transform: translateX(50px);
            }
            .testimonial-section .testimonial-right.animate-from-right {
                opacity: 1;
                transform: translateX(0);
            }
            .testimonial-section .testimonial-wrapper {
                min-height: auto;
            }
            @media (min-width: 768px) {
                .testimonial-section .testimonial-wrapper {
                    min-height: 80vh;
                }
            }
            @media (min-width: 992px) {
                .testimonial-section .testimonial-wrapper {
                    min-height: 100vh;
                }
            }
            .testimonial-section .testimonial-left {
                display: none;
                width: 100%;
                height: 300px;
                top: 0;
            }
            @media (min-width: 992px) {
                .testimonial-section .testimonial-left {
                    display: flex;
                    width: 50%;
                    height: 100%;
                    top: -50;
                }
            }
            .testimonial-section .sub-title {
                font-size: 14px;
                margin-bottom: 10px;
            }
            @media (min-width: 576px) {
                .testimonial-section .sub-title {
                    font-size: 16px;
                    margin-bottom: 15px;
                }
            }
            @media (min-width: 768px) {
                .testimonial-section .sub-title {
                    font-size: 18px;
                    margin-bottom: 20px;
                }
            }
            .testimonial-section .title {
                font-size: 24px;
                margin-bottom: 20px;
            }
            @media (min-width: 576px) {
                .testimonial-section .title {
                    font-size: 32px;
                    margin-bottom: 25px;
                }
            }
            @media (min-width: 768px) {
                .testimonial-section .title {
                    font-size: 40px;
                    margin-bottom: 30px;
                }
            }
            @media (min-width: 992px) {
                .testimonial-section .title {
                    font-size: 48px;
                    margin-bottom: 40px;
                }
            }
            .testimonial-section .testimonial-card {
                min-height: 250px;
                padding: 20px;
            }
            @media (min-width: 576px) {
                .testimonial-section .testimonial-card {
                    min-height: 280px;
                    padding: 25px;
                }
            }
            @media (min-width: 768px) {
                .testimonial-section .testimonial-card {
                    min-height: 300px;
                    padding: 30px;
                }
            }
            .testimonial-section .col-xl-7 {
                padding-top: 20px;
            }
            @media (min-width: 992px) {
                .testimonial-section .col-xl-7 {
                    padding-top: 0;
                }
            }
            .testimonial-section .col-xl-5 {
                padding-bottom: 20px;
            }
                @media (min-width: 992px) {
                    .testimonial-section .col-xl-5 {
                        padding-bottom: 0;
                    }
                }
                .testimonial-section {
                    overflow-x: hidden;
                }
                .testimonial-section .testimonial-card p {
                    font-size: 14px;
                    line-height: 1.6;
                }
                @media (min-width: 576px) {
                    .testimonial-section .testimonial-card p {
                        font-size: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .testimonial-section .testimonial-card p {
                        font-size: 16px;
                    }
                }
                .testimonial-section .testimonial-card h6 {
                    font-size: 18px;
                }
                @media (min-width: 576px) {
                    .testimonial-section .testimonial-card h6 {
                        font-size: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .testimonial-section .testimonial-card h6 {
                        font-size: 22px;
                    }
                }
            `}} />
    <section className="testimonial-section fix bg-color3">
        <div ref={testimonialRef} className="testimonial-wrapper style1 section-padding" style={{ position: 'relative' }}>
            <div className={`shape testimonial-left ${isVisible ? 'animate-from-left' : ''}`} style={{ position: 'absolute', zIndex: 0, display: 'flex', alignItems: 'center' }}>
                <div className="testimonial-image-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image 
                        src="/assets/img/testimonial/testimonialThumb1_1.png" 
                        className=""
                        alt="img" 
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'left center' }}
                        sizes="(max-width: 991px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>
            <div className="shape2 d-none d-md-block"><Image src="/assets/img/shape/testimonialShape1_1.png" alt="img" width={224} height={401}   /></div>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-xl-5 d-flex align-items-center justify-content-center order-2 order-xl-1">
                        {/* Image is displayed via background shape div on desktop */}
                    </div>
                    <div className={`col-12 col-xl-7 testimonial-right ${isVisible ? 'animate-from-right' : ''} order-1 order-xl-2`} style={{ position: 'relative', zIndex: 1 }}>
                        <div className="title-area">
                            <div className="sub-title text-center wow fadeInUp " style={{ color: '#0D5189' }} data-wow-delay="0.5s">
                                Omega Foods 
                            </div>
                            <h2 className="title" style={{ color: '#0D5189' }} data-wow-delay="0.7s">
                                What our Clients Say
                            </h2>
                        </div>
                        <div className="slider-area">
                            <div className="swiper testmonialSliderOne">
                                <div className="swiper-wrapper">
                                <Slider ref={sliderRef} {...settings}>
                                {tesItems.map((item, i) => (
                                    <div key={i} className="swiper-slide" >
                                        <div className="testimonial-card style1 m-2" style={{ minHeight: '300px' }}>
                                            <div className="testimonial-header">
                                                <div className="fancy-box">
                                                    {/* <div className="item1"><Image src={item.img} alt="img" width={100} height={100}   /></div> */}
                                                    <div className="item2">
                                                        <h6>{item.title}</h6>
                                                        <p>{item.designation}</p>
                                                        <div className="icon"><Image src="/assets/img/icon/star.svg" alt="img" width={108} height={20}   /></div>
                                                    </div>
                                                    <div className="quote"><Image src="/assets/img/icon/quote.svg" alt="img" width={50} height={37}   />
                                                    </div>
                                                </div>
                                            </div>

                                            <p>{item.content}</p>
                                        </div>
                                            </div>
                                ))}
                                </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-wrap">
                <div onClick={previous} className="arrow-prev"><i className="bi bi-arrow-left"></i></div>
                <div onClick={next} className="arrow-next"><i className="bi bi-arrow-right"></i></div>
            </div>
        </div>

        {/* <div className="marquee-wrapper style-2 text-slider section-padding">
            <div className="marquee-inner to-left">
                <ul className="marqee-list d-flex">
                    <li className="marquee-item style-2">
                        <span className="text-slider"></span><span className="text-slider text-style">chicken pizza</span>
                        <span className="text-slider"></span><span className="text-slider text-style">GRILLED CHICKEN</span>
                        <span className="text-slider"></span><span className="text-slider text-style">BURGER</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN PIZZA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">FRESH PASTA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">ITALIANO FRENCH FRY</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN FRY</span>
                        <span className="text-slider"></span><span className="text-slider text-style">chicken pizza</span>
                        <span className="text-slider"></span><span className="text-slider text-style">GRILLED CHICKEN</span>
                        <span className="text-slider"></span><span className="text-slider text-style">BURGER</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN PIZZA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">FRESH PASTA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">ITALIANO FRENCH FRY</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN FRY</span>
                    </li>
                </ul>
            </div>
        </div> */}

        {/* <VideoModal
            isTrue={toggle}
            iframeSrc={iframeSrc}
            handelClose={handelClose}        
        ></VideoModal>  */}
    </section>
    </>
    );
};

export default Testimonial1;