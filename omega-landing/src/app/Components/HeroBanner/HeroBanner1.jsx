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
        'Freshness you can see. Quality you can taste.',
        'Only the best makes it to you.',
    ];

    const [displayedText, setDisplayedText] = useState(headings[0]);
    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let timeout;
        const currentHeading = headings[currentHeadingIndex];
        
        if (!isDeleting && !isTyping && displayedText === currentHeading) {
            // Display full text, wait 2 seconds, then start deleting
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting) {
            // Delete letters one by one from right to left
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(prev => prev.slice(0, -1));
                }, 50); // Delete speed
            } else {
                // Finished deleting, move to next heading and start typing
                setIsDeleting(false);
                const nextIndex = (currentHeadingIndex + 1) % headings.length;
                setCurrentHeadingIndex(nextIndex);
                setIsTyping(true);
                // Start typing the first character immediately
                setDisplayedText(headings[nextIndex][0]);
            }
        } else if (isTyping) {
            // Type letters one by one from left to right
            if (displayedText.length < currentHeading.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(currentHeading.slice(0, displayedText.length + 1));
                }, 100); // Typing speed
            } else {
                // Finished typing
                setIsTyping(false);
            }
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [displayedText, currentHeadingIndex, isDeleting, isTyping]);

    const heroContent = [
        {subtitle:'WELCOME Omega Foods', btnname:'ORDER NOW'},
      ]; 

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .typewriter-cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1em;
                    background-color: currentColor;
                    margin-left: 4px;
                    animation: blink 1s infinite;
                }
            `}} />
            <div className="slider-area">
                <div className="swiper banner-slider">
                    <div className="swiper-wrapper">

                    {heroContent.map((item, i) => (
                        <div key={i} className="swiper-slide">
                            <div className="style1 position-relative">
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
                                <Image src="/assets/img/banner/banner1.webp" alt="banner" width={1920} height={800}  />
                                <div className="overlay"></div>
                                {/* <div className="banner-container" style={{position: 'relative', zIndex: 1}}>
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
                                                        <div className="section-title">
                                                            <h6 className="sub-title" data-animation="slideInLeft"
                                                                data-duration="2s" data-delay=".3s"> {item.subtitle} </h6>
                                                            <h4 className="title" data-animation="slideInLeft"
                                                                data-duration="2s" data-delay=".5s"
                                                               >
                                                                {displayedText}
                                                                <span className="typewriter-cursor"></span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
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