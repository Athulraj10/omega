"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const HeroBanner1 = () => {

    const headings = [
        '(Four decades) of <strong>(trusted)</strong> <br> quality and service',
        '(Freshness) you can see. <br> Quality you can (taste).',
        'Only the (best) makes it to you. <br>',
    ];

    // Function to process text and style bracketed content
    const processHeading = (text) => {
        // Replace text in brackets with styled spans
        return text.replace(/\(([^)]+)\)/g, '<span style="color: #0D5189;">$1</span>');
    };

    const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        // Set page loaded state for initial animations
        setIsPageLoaded(true);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
        }, 3000); // Change heading every 3 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    const heroContent = [
        {subtitle:'WELCOME Omega Foods'},
      ]; 

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .slider-area {
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                @media (min-width: 576px) {
                    .slider-area {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                }
                @media (min-width: 768px) {
                    .slider-area {
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }
                }
                @media (min-width: 992px) {
                    .slider-area {
                        padding-left: 3rem;
                        padding-right: 3rem;
                    }
                }
                .hero-min-height {
                    min-height: 400px;
                }
                @media (min-width: 768px) {
                    .hero-min-height {
                        min-height: 500px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-min-height {
                        min-height: 600px;
                    }
                }
                .hero-welcome-title {
                    font-size: 36px;
                }
                @media (min-width: 576px) {
                    .hero-welcome-title {
                        font-size: 48px;
                    }
                }
                @media (min-width: 768px) {
                    .hero-welcome-title {
                        font-size: 56px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-welcome-title {
                        font-size: 70px;
                    }
                }
                .hero-subtitle {
                    font-size: 16px;
                }
                @media (min-width: 576px) {
                    .hero-subtitle {
                        font-size: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .hero-subtitle {
                        font-size: 24px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-subtitle {
                        font-size: 27px;
                    }
                }
                .hero-subtitle-letter-spacing {
                    letter-spacing: 3px;
                }
                @media (min-width: 768px) {
                    .hero-subtitle-letter-spacing {
                        letter-spacing: 5px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-subtitle-letter-spacing {
                        letter-spacing: 6.5px;
                    }
                }
                .hero-animated-text {
                    font-size: 20px;
                }
                @media (min-width: 576px) {
                    .hero-animated-text {
                        font-size: 24px;
                    }
                }
                @media (min-width: 768px) {
                    .hero-animated-text {
                        font-size: 30px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-animated-text {
                        font-size: 36px;
                    }
                }
                .hero-padding {
                    padding: 20px 0;
                }
                @media (min-width: 768px) {
                    .hero-padding {
                        padding: 30px 0;
                    }
                }
                @media (min-width: 992px) {
                    .hero-padding {
                        padding: 40px 0;
                    }
                }
                .hero-margin-bottom {
                    margin-bottom: 40px;
                }
                @media (min-width: 768px) {
                    .hero-margin-bottom {
                        margin-bottom: 50px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-margin-bottom {
                        margin-bottom: 70px;
                    }
                }
                .hero-heading-container-height {
                    height: 60px;
                }
                @media (min-width: 576px) {
                    .hero-heading-container-height {
                        height: 80px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-heading-container-height {
                        height: 100px;
                    }
                }
                .hero-image-padding {
                    padding: 20px;
                }
                @media (min-width: 768px) {
                    .hero-image-padding {
                        padding: 30px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-image-padding {
                        padding: 40px;
                    }
                }
                .banner-title-area-left {
                    text-align: center;
                }
                @media (min-width: 992px) {
                    .banner-title-area-left {
                        text-align: left;
                    }
                }
                .hero-heading-container-justify {
                    justify-content: center;
                }
                @media (min-width: 992px) {
                    .hero-heading-container-justify {
                        justify-content: flex-start;
                    }
                }
                .hero-heading-text-align {
                    text-align: center;
                }
                @media (min-width: 992px) {
                    .hero-heading-text-align {
                        text-align: left;
                    }
                }
                .hero-section-title-wrapper {
                    justify-content: center;
                }
                @media (min-width: 992px) {
                    .hero-section-title-wrapper {
                        justify-content: flex-start;
                    }
                }
                .hero-heading-text-align br {
                    display: block;
                }
                @media (max-width: 575px) {
                    .hero-heading-text-align br {
                        display: none;
                    }
                }
                .slider-area {
                    overflow-x: hidden;
                }
                .heading-container {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                }
                .heading-slider-wrapper {
                    display: flex;
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform;
                }
                .heading-item {
                    min-width: 100%;
                    flex-shrink: 0;
                }
                .container {
                    padding-left: 15px;
                    padding-right: 15px;
                }
                @media (min-width: 576px) {
                    .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                @media (min-width: 992px) {
                    .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
            `}} />
            <div className="slider-area border-bottom">
                <div className="swiper banner-slider">
                    <div className="swiper-wrapper">

                   
                    {heroContent.map((item, i) => (
                        <div key={i} className="swiper-slide">
                            <div className="style1 position-relative hero-min-height" style={{ overflow: 'visible !important' }}>
                                <div className="banner-background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#ffffff', zIndex: 0 }}></div>
                                <div className="banner-container" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', alignItems: 'center'}}>
                                    <div className="container">
                                        <div className="row align-items-center">
                                            {/* Left side - Animated text */}
                                            <div className="col-12 col-lg-6 order-1">
                                                <div className="banner-title-area-left hero-padding">
                                                    <div className="banner-style1" style={{ width: '100%' }}>
                                                        <div className="welcome-text hero-margin-bottom">
                                                            <h1 className={`hero-welcome-title ${isPageLoaded ? 'welcome-slide-left' : ''}`} style={{ color: '#0D5189', fontWeight: '700', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1.1', margin: 0, opacity: isPageLoaded ? 1 : 0 }}>
                                                                Welcome
                                                            </h1>
                                                            <div className={`hero-subtitle hero-subtitle-letter-spacing ${isPageLoaded ? 'welcome-slide-right' : ''}`} style={{ display: 'flex', flexDirection: 'column', color: '#0D5189', fontWeight: '600', fontFamily: 'inherit', textTransform: 'uppercase', lineHeight: '1.8', opacity: isPageLoaded ? 1 : 0 }}>
                                                                <span style={{ color: '#0D5189' }}>to Omega SeaFoods</span>
                                                            </div>
                                                        </div>
                                                        <div className="section-title hero-section-title-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div className="hero-animated-text" style={{ lineHeight: '1.3', marginBottom: '20px', color: '#0D5189', fontWeight: '600', fontFamily: 'inherit' }}>
                                                                <div className="heading-container hero-heading-container-height hero-heading-container-justify" style={{ display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', width: '100%' }}>
                                                                    <div 
                                                                        className="heading-slider-wrapper"
                                                                        style={{ 
                                                                            transform: `translateX(-${currentHeadingIndex * 100}%)`,
                                                                        }}
                                                                    >
                                                                        {headings.map((heading, index) => (
                                                                            <div 
                                                                                key={index}
                                                                                className="heading-item hero-heading-text-align"
                                                                                style={{ 
                                                                                    color: '#000000', 
                                                                                    fontFamily: 'inherit',
                                                                                    width: '100%'
                                                                                }}
                                                                                dangerouslySetInnerHTML={{ __html: processHeading(heading) }}
                                                                            ></div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Right side - Banner Image */}
                                            <div className="col-12 col-lg-6 order-2">
                                                <div className="banner-image-area hero-padding">
                                                    <div className={`${isPageLoaded ? 'image-slide-up' : ''} hero-image-padding`} style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', opacity: isPageLoaded ? 1 : 0 }}>
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