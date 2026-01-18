"use client"
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";

const Team1 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const teamRef = useRef(null);
    const lastScrollY = useRef(0);

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

        const currentRef = teamRef.current;
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

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .chefe-section .team-item {
                    opacity: 0;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .chefe-section .team-item.team-item-left {
                    transform: translateX(-50px);
                }
                .chefe-section .team-item.team-item-left.animate-from-left {
                    opacity: 1;
                    transform: translateX(0);
                }
                .chefe-section .team-item.team-item-center.animate-from-center {
                    opacity: 1;
                    transform: translateY(0);
                }
                .chefe-section .team-item.team-item-right {
                    transform: translateX(50px);
                }
                .chefe-section .team-item.team-item-right.animate-from-right {
                    opacity: 1;
                    transform: translateX(0);
                }
            `}} />
<section className="chefe-section fix p-5 border border-blue-300 m-5 border-top-0">
        <div className="chefe-wrapper style1 mb-3">
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
                    <h2 className="title  wow fadeInUp mb-5" style={{ color: '#0D5189' }} data-wow-delay="0.7s">
                        Quality food and service categories
                    </h2>
                </div>
                <div ref={teamRef} className="pb-5">
                    <div className="row">
                    {teamItems.map((item, i) => {
                        let positionClass = '';
                        let animateClass = '';
                        let inlineStyle = {};
                        
                        if (i === 0) {
                            // Left image
                            positionClass = 'team-item-left';
                            animateClass = isVisible ? 'animate-from-left' : '';
                        } else if (i === 1) {
                            // Center image - use inline style for dynamic scroll direction
                            positionClass = 'team-item-center';
                            animateClass = isVisible ? 'animate-from-center' : '';
                            inlineStyle = {
                                transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
                                opacity: isVisible ? 1 : 0,
                                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                            };
                        } else if (i === 2) {
                            // Right image
                            positionClass = 'team-item-right';
                            animateClass = isVisible ? 'animate-from-right' : '';
                        }
                        
                        return (
                        <div key={i} className="col-lg-6 col-xl-4">
                            <div 
                                className={`team-item ${positionClass} ${animateClass}`} 
                                style={i === 1 ? inlineStyle : {}}
                                data-wow-delay="0.2s"
                            >
                                <div className="">
                                <Image src={item.img} className="shadow rounded-3" alt="img" width={400} height={300} />
                                </div>
                              <div className="mt-3 justify-content-center chefe-content">
                                        <h3 className="text-center" style={{ color: '#0D5189' }}>{item.title} </h3>
                                </div>
                            </div>
                        </div>
                        );
                    })}

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
    </>
    );
};

export default Team1;