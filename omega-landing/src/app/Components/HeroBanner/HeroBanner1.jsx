"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

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

    const headings = [
        'Four decades of trusted quality and service',
        'Freshness you can see. <br> Quality you can taste.',
        'Only the best makes it to you. <br>',
    ];

    const [displayedText, setDisplayedText] = useState(headings[0]);
    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // Start sliding out animation
            setIsSliding(true);
            
            // After slide out, change the text and slide in
            setTimeout(() => {
                const nextIndex = (currentHeadingIndex + 1) % headings.length;
                setCurrentHeadingIndex(nextIndex);
                setDisplayedText(headings[nextIndex]);
            }, 600); // Half of animation duration
            
            // Reset animation state after animation completes
            setTimeout(() => {
                setIsSliding(false);
            }, 900); // Full animation duration
        }, 3000); // Change heading every 3 seconds

        return () => {
            clearInterval(interval);
        };
    }, [currentHeadingIndex]);

    const heroContent = [
        {subtitle:'WELCOME Omega Foods'},
      ]; 

    return (
        <>
            <div className="slider-area">
                <div className="swiper banner-slider">
                    <div className="swiper-wrapper">

                    {heroContent.map((item, i) => (
                        <div key={i} className="swiper-slide">
                            <div className="style1 position-relative" style={{ minHeight: '600px', overflow: 'visible !important' }}>
                                {/* <video 
                                    className="w-100 h-100" 
                                    style={{
                                        objectFit: 'cover',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 0
                                    }}
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline
                                >
                                    <source src="/assets/img/banner/banner.mp4" type="video/mp4" />
                                </video> */}
                                <Image 
                                    src="/assets/img/banner/banner1.webp" 
                                    alt="banner" 
                                    width={1920} 
                                    height={1000}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        zIndex: 0
                                    }}
                                />
                                <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}></div>
                                <div className="banner-container" style={{position: 'absolute', top: -100, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', alignItems: 'center'}}>
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-12 col-xl-6 d-none d-xxl-block order-1">
                                                <div className="banner-thumb-area" data-tilt data-animation="slideInLeft"
                                                    data-duration="2s" data-delay=".9s">
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-10 col-xl-8 col-xxl-6 order-2 mx-auto">
                                                <div className="banner-title-area text-center text-xxl-end">
                                                    <div className="banner-style1">
                                    <h6 className="" data-animation="" data-duration="2s" data-delay=".3s" style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '10px', color: 'white' }}> {item.subtitle} </h6>
                                                        <div className="section-title" style={{ position: 'relative', height: '120px' }}>
                                                            <div className="title" data-animation="slideInLeft"
                                                                data-duration="2s" data-delay=".5s"
                                                                style={{ fontSize: '36px', lineHeight: '1.3', marginBottom: '20px', position: 'absolute', top: 0, left: 0, width: '100%', color: 'white' }}
                                                               >
                                                                <div className="heading-container" style={{ height: '100px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                                                                    <span className={`heading-wrapper ${isSliding ? 'heading-slide-in' : ''}`} style={{ width: '100%', color: 'white' }} dangerouslySetInnerHTML={{ __html: displayedText }}></span>
                                                                </div>
                                                            </div>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroBanner1;