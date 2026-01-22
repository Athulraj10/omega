"use client"
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";

const Team1 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [sliderVisible, setSliderVisible] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const teamRef = useRef(null);
    const sliderRef = useRef(null);
    const titleRef = useRef(null);
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
      {img:'/assets/img/chefe/chefeThumb1_1.png', title:'Value Added Packaging', content:'Chef Lead', facebook:'#', linkedin:'#'},
      ]; 

      const logoItems = [
        {img:'/assets/img/logo/clientLogo1_1.png'},
        {img:'/assets/img/logo/clientLogo1_2.png'},
        {img:'/assets/img/logo/clientLogo1_3.png'},
        {img:'/assets/img/logo/clientLogo1_4.png'},
        {img:'/assets/img/logo/clientLogo1_5.png'},
        {img:'/assets/img/logo/clientLogo1_6.png'},
        {img:'/assets/img/logo/clientLogo1_7.png'},      
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

        const teamObserver = new IntersectionObserver(
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

        const sliderObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setSliderVisible(true);
                        }, 100);
                    } else {
                        setSliderVisible(false);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const titleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsTitleVisible(true);
                    } else {
                        setIsTitleVisible(false);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentTeamRef = teamRef.current;
        const currentSliderRef = sliderRef.current;
        const currentTitleRef = titleRef.current;
        
        if (currentTeamRef) {
            teamObserver.observe(currentTeamRef);
        }
        
        if (currentSliderRef) {
            sliderObserver.observe(currentSliderRef);
        }

        if (currentTitleRef) {
            titleObserver.observe(currentTitleRef);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (currentTeamRef) {
                teamObserver.unobserve(currentTeamRef);
            }
            if (currentSliderRef) {
                sliderObserver.unobserve(currentSliderRef);
            }
            if (currentTitleRef) {
                titleObserver.unobserve(currentTitleRef);
            }
            teamObserver.disconnect();
            sliderObserver.disconnect();
            titleObserver.disconnect();
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
                .chefe-section .client-img img {
                    max-width: 100%;
                    height: auto;
                    width: auto;
                    object-fit: contain;
                    max-height: 80px;
                }
                @media (min-width: 576px) {
                    .chefe-section .client-img img {
                        max-height: 70px;
                    }
                }
                @media (min-width: 768px) {
                    .chefe-section .client-img img {
                        max-height: 60px;
                    }
                }
                @media (min-width: 992px) {
                    .chefe-section .client-img img {
                        max-height: 50px;
                    }
                }
                @media (min-width: 1200px) {
                    .chefe-section .client-img img {
                        max-height: 45px;
                    }
                }
                @media (min-width: 1400px) {
                    .chefe-section .client-img img {
                        max-height: 100px;
                    }
                }
                .chefe-section .logo-slide-item {
                    opacity: 0;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .chefe-section .logo-slide-item.logo-from-left {
                    transform: translateX(-100px);
                }
                .chefe-section .logo-slide-item.logo-from-left.animate-logo {
                    opacity: 1;
                    transform: translateX(0);
                }
                .chefe-section .logo-slide-item.logo-from-right {
                    transform: translateX(100px);
                }
                .chefe-section .logo-slide-item.logo-from-right.animate-logo {
                    opacity: 1;
                    transform: translateX(0);
                }
                .chefe-section .logo-slide-item.logo-from-top {
                    transform: translateY(-100px);
                }
                .chefe-section .logo-slide-item.logo-from-top.animate-logo {
                    opacity: 1;
                    transform: translateY(0);
                }
                .chefe-section .logo-slide-item.logo-from-bottom {
                    transform: translateY(100px);
                }
                .chefe-section .logo-slide-item.logo-from-bottom.animate-logo {
                    opacity: 1;
                    transform: translateY(0);
                }
                .chefe-section .logo-slide-item.logo-from-top-left {
                    transform: translate(-100px, -100px);
                }
                .chefe-section .logo-slide-item.logo-from-top-left.animate-logo {
                    opacity: 1;
                    transform: translate(0, 0);
                }
                .chefe-section .logo-slide-item.logo-from-top-right {
                    transform: translate(100px, -100px);
                }
                .chefe-section .logo-slide-item.logo-from-top-right.animate-logo {
                    opacity: 1;
                    transform: translate(0, 0);
                }
                .chefe-section .logo-slide-item.logo-from-bottom-left {
                    transform: translate(-100px, 100px);
                }
                .chefe-section .logo-slide-item.logo-from-bottom-left.animate-logo {
                    opacity: 1;
                    transform: translate(0, 0);
                }
                .chefe-section-responsive {
                    padding: 20px 10px;
                    margin: 20px 10px;
                }
                @media (min-width: 576px) {
                    .chefe-section-responsive {
                        padding: 30px 20px;
                        margin: 30px 20px;
                    }
                }
                @media (min-width: 768px) {
                    .chefe-section-responsive {
                        padding: 40px 30px;
                        margin: 40px 30px;
                    }
                }
                @media (min-width: 992px) {
                    .chefe-section-responsive {
                        padding: 50px;
                        margin: 50px;
                    }
                }
                .chefe-section .sub-title {
                    font-size: 14px;
                }
                @media (min-width: 576px) {
                    .chefe-section .sub-title {
                        font-size: 16px;
                    }
                }
                @media (min-width: 768px) {
                    .chefe-section .sub-title {
                        font-size: 18px;
                    }
                }
                .chefe-section .title {
                    font-size: 24px;
                    margin-bottom: 20px;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .chefe-section .title.title-slide-up {
                    opacity: 1;
                    transform: translateY(0);
                }
                @media (min-width: 576px) {
                    .chefe-section .title {
                        font-size: 32px;
                        margin-bottom: 30px;
                    }
                }
                @media (min-width: 768px) {
                    .chefe-section .title {
                        font-size: 40px;
                        margin-bottom: 40px;
                    }
                }
                @media (min-width: 992px) {
                    .chefe-section .title {
                        font-size: 48px;
                        margin-bottom: 50px;
                    }
                }
                .chefe-section .team-item img {
                    width: 100%;
                    height: auto;
                }
                .chefe-section .chefe-content h3 {
                    font-size: 18px;
                }
                @media (min-width: 576px) {
                    .chefe-section .chefe-content h3 {
                        font-size: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .chefe-section .chefe-content h3 {
                        font-size: 24px;
                    }
                }
                .chefe-section {
                    overflow-x: hidden;
                }
                .chefe-section .row {
                    margin-left: -10px;
                    margin-right: -10px;
                }
                .chefe-section .row > * {
                    padding-left: 10px;
                    padding-right: 10px;
                }
                @media (min-width: 576px) {
                    .chefe-section .row {
                        margin-left: -15px;
                        margin-right: -15px;
                    }
                    .chefe-section .row > * {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
            `}} />
<section className="chefe-section fix border border-blue-300 border-top-0 chefe-section-responsive">
        <div className="chefe-wrapper style1 mb-3">
            <div className="shape1 d-none d-xxl-block"><Image className="float-bob-y" src="/assets/img/shape/chefeShape1_1.png" alt="img" width={167} height={132}   /></div>
            <div className="container">
                <div className="title-area">
                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                    {/* <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   /> */}
                        We offer the best
                        {/* <Image className="ms-1"
                            src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   /> */}
                    </div>
                    <h2 ref={titleRef} className={`title wow fadeInUp mb-5 ${isTitleVisible ? 'title-slide-up' : ''}`} style={{ color: '#0D5189' }} data-wow-delay="0.7s">
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
                <div ref={sliderRef} className="slider-area wow fadeInUp" data-wow-delay="0.5s">
                    <div className="swiper clientSliderOne">
                        <div className="swiper-wrapper">
                        <Slider {...settings}>
                        {logoItems.map((item, i) => {
                            // Define different animation directions for each of the 7 images
                            const directionClasses = [
                                'logo-from-left',        // Image 0: from left
                                'logo-from-right',       // Image 1: from right
                                'logo-from-top',         // Image 2: from top
                                'logo-from-bottom',      // Image 3: from bottom
                                'logo-from-top-left',    // Image 4: from top-left (diagonal)
                                'logo-from-top-right',   // Image 5: from top-right (diagonal)
                                'logo-from-bottom-left'  // Image 6: from bottom-left (diagonal)
                            ];
                            
                            const directionClass = directionClasses[i] || 'logo-from-left';
                            const animateClass = sliderVisible ? 'animate-logo' : '';
                            
                            return (
                                <div key={i} className="swiper-slide">
                                    <div className={`client-img text-center logo-slide-item ${directionClass} ${animateClass}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                                        <img 
                                            src={item.img} 
                                            alt="thumb" 
                                            className="img-fluid d-inline-block"
                                        />
                                    </div>
                                </div>
                            );
                        })}
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