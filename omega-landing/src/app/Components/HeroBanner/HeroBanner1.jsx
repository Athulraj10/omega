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
        'Four decades of <strong>(trusted)</strong> <br> quality and service',
        '(Freshness) you can see. <br> Quality you can (taste).',
        'Only the (best) makes it to you. <br>',
    ];

    // Function to process text and style bracketed content
    const processHeading = (text) => {
        // Replace text in brackets with styled spans
        return text.replace(/\(([^)]+)\)/g, '<span style="color: #0D5189;">$1</span>');
    };

    const [displayedText, setDisplayedText] = useState(processHeading(headings[0]));
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
                setDisplayedText(processHeading(headings[nextIndex]));
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
            <div className="slider-area border-bottom">
                <div className="swiper banner-slider">
                    <div className="swiper-wrapper">

                   
                    {heroContent.map((item, i) => (
                        <div key={i} className="swiper-slide">
                            <div className="style1 position-relative" style={{ minHeight: '600px', overflow: 'visible !important' }}>
                                <div className="banner-background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#ffffff', zIndex: 0 }}></div>
                                <div className="banner-container" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', alignItems: 'center'}}>
                                    <div className="container">
                                        <div className="row align-items-center">
                                            {/* Left side - Animated text */}
                                            <div className="col-12 col-lg-6 order-1">
                                                <div className="banner-title-area-left" style={{ padding: '40px 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                    <div className="banner-style1" style={{ textAlign: 'left', width: '100%' }}>
                                                        <div className="welcome-text" style={{ marginBottom: '70px', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                                            <h1 style={{ fontSize: '70px', color: '#0D5189', fontWeight: '700', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1.1', margin: 0 }}>
                                                                Welcome
                                                            </h1>
                                                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '27px', color: '#0D5189', fontWeight: '600', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '6.5px', lineHeight: '1.8' }}>
                                                                <span style={{ color: '#0D5189' }}>to Omega SeaFoods</span>
                                                                {/* <span style={{ color: '#0D5189' }}>SeaFoods</span> */}
                                                            </div>
                                                        </div>
                                                        <div className="section-title" style={{ position: 'relative', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                            <div className="title"
                                                                style={{ fontSize: '36px', lineHeight: '1.3', marginBottom: '20px', color: '#0D5189', fontWeight: '600', fontFamily: 'inherit' }}
                                                               >
                                                                <div className="heading-container" style={{ height: '100px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', justifyContent: 'flex-start' }}>
                                                                    <span className={`heading-wrapper ${isSliding ? 'heading-slide-in' : ''}`} style={{ width: '100%', color: '#000000', textAlign: 'left', fontFamily: 'inherit' }} dangerouslySetInnerHTML={{ __html: displayedText }}></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Right side - Banner Image */}
                                            <div className="col-12 col-lg-6 order-2">
                                                <div className="banner-image-area" style={{ padding: '40px 0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div style={{ position: 'relative', width: '100%', maxWidth: '600px' ,padding: '40px'}}>
                                                        <Image
                                                            src="/assets/img/banner/banner2.webp"
                                                            alt="Tasty and Fresh Seafood"
                                                            width={600}
                                                            height={400}
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'contain',
                                                                display: 'block',
                                                                
                                                            }}
                                                            priority
                                                        />
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