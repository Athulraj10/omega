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
                    padding-left: 10px;
                    padding-right: 10px;
                    overflow-x: hidden;
                    overflow-y: visible;
                }
                @media (min-width: 375px) {
                    .slider-area {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                @media (min-width: 576px) {
                    .slider-area {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .slider-area {
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                }
                @media (min-width: 992px) {
                    .slider-area {
                        padding-left: 40px;
                        padding-right: 40px;
                    }
                }
                .hero-min-height {
                    min-height: auto;
                    padding-top: 15px;
                    padding-bottom: 15px;
                }
                @media (min-width: 375px) {
                    .hero-min-height {
                        min-height: auto;
                        padding-top: 20px;
                        padding-bottom: 20px;
                    }
                }
                @media (min-width: 576px) {
                .hero-min-height {
                    min-height: 400px;
                        padding-top: 30px;
                        padding-bottom: 30px;
                    }
                }
                @media (min-width: 768px) {
                    .hero-min-height {
                        min-height: 500px;
                        padding-top: 50px;
                        padding-bottom: 50px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-min-height {
                        min-height: 600px;
                        padding-top: 70px;
                        padding-bottom: 70px;
                    }
                }
                .hero-welcome-title {
                    font-size: 24px !important;
                    letter-spacing: 1px !important;
                }
                @media (min-width: 375px) {
                    .hero-welcome-title {
                        font-size: 28px !important;
                        letter-spacing: 1.5px !important;
                    }
                }
                @media (min-width: 576px) {
                    .hero-welcome-title {
                        font-size: 36px !important;
                        letter-spacing: 2px !important;
                    }
                }
                @media (min-width: 768px) {
                    .hero-welcome-title {
                        font-size: 48px !important;
                    }
                }
                @media (min-width: 992px) {
                    .hero-welcome-title {
                        font-size: 56px !important;
                    }
                }
                @media (min-width: 1200px) {
                    .hero-welcome-title {
                        font-size:76px !important;
                    }
                }
                .responsive-hero-image {
                    position: relative;
                    width: 100%;
                    margin: 0 auto;
                }
                @media (min-width: 992px) {
                    .responsive-hero-image {
                        width: 120%;
                        margin-left: 100px;
                        transform: translateY(100px);
                    }
                }
                .hero-subtitle {
                    font-size: 12px !important;
                    line-height: 1.5 !important;
                    // margin-top: 8px;
                }
                @media (min-width: 375px) {
                    .hero-subtitle {
                        font-size: 14px !important;
                        // margin-top: 10px;
                    }
                }
                @media (min-width: 576px) {
                    .hero-subtitle {
                        font-size: 18px !important;
                        // margin-top: 12px;
                    }
                }
                @media (min-width: 768px) {
                    .hero-subtitle {
                        font-size: 22px !important;
                        // margin-top: 15px;
                    }
                }
                @media (min-width: 992px) {
                    .hero-subtitle {
                        font-size: 27px !important;
                        // margin-top: 20px;
                    }
                }
                .hero-subtitle-letter-spacing {
                    letter-spacing: 1px !important;
                }
                @media (min-width: 375px) {
                    .hero-subtitle-letter-spacing {
                        letter-spacing: 2px !important;
                    }
                }
                @media (min-width: 576px) {
                    .hero-subtitle-letter-spacing {
                        letter-spacing: 3px !important;
                    }
                }
                @media (min-width: 768px) {
                    .hero-subtitle-letter-spacing {
                        letter-spacing: 4px !important;
                    }
                }
                @media (min-width: 992px) {
                    .hero-subtitle-letter-spacing {
                        letter-spacing: 6.5px !important;
                    }
                }
                .hero-animated-text {
                    font-size: 14px !important;
                    line-height: 1.5 !important;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                    white-space: normal;
                    display: block;
                    width: 100%;
                    padding: 0 !important;
                    margin: 0 !important;
                }
                @media (min-width: 375px) {
                    .hero-animated-text {
                        font-size: 15px !important;
                        line-height: 1.5 !important;
                    }
                }
                @media (min-width: 576px) {
                    .hero-animated-text {
                        font-size: 18px !important;
                        line-height: 1.4 !important;
                    }
                }
                @media (min-width: 768px) {
                    .hero-animated-text {
                        font-size: 24px !important;
                        line-height: 1.35 !important;
                    }
                }
                @media (min-width: 992px) {
                    .hero-animated-text {
                        font-size: 30px !important;
                        line-height: 1.3 !important;
                    }
                }
                @media (min-width: 1200px) {
                    .hero-animated-text {
                        font-size: 36px !important;
                        line-height: 1.3 !important;
                    }
                }
                .hero-padding {
                    padding: 0 !important;
                }
                .hero-margin-bottom {
                    margin-bottom: 10px !important;
                }
                @media (min-width: 375px) {
                    .hero-margin-bottom {
                        margin-bottom: 12px !important;
                    }
                }
                @media (min-width: 576px) {
                    .hero-margin-bottom {
                        margin-bottom: 20px !important;
                    }
                }
                @media (min-width: 768px) {
                    .hero-margin-bottom {
                        margin-bottom: 30px !important;
                    }
                }
                @media (min-width: 992px) {
                    .hero-margin-bottom {
                        margin-bottom: 40px !important;
                    }
                }
                @media (min-width: 1200px) {
                    .hero-margin-bottom {
                        margin-bottom: 60px !important;
                    }
                }
                .hero-heading-container-height {
                    min-height: 70px;
                    height: auto;
                }
                @media (min-width: 375px) {
                    .hero-heading-container-height {
                        min-height: 80px;
                        height: auto;
                    }
                }
                @media (min-width: 576px) {
                    .hero-heading-container-height {
                        min-height: 90px;
                        height: auto;
                    }
                }
                @media (min-width: 768px) {
                    .hero-heading-container-height {
                        min-height: 100px;
                        height: auto;
                    }
                }
                @media (min-width: 992px) {
                    .hero-heading-container-height {
                        min-height: 110px;
                        height: 110px;
                    }
                }
                .hero-image-padding {
                    padding: 0 !important;
                    margin-top: 20px !important;
                }
                @media (min-width: 992px) {
                    .hero-image-padding:not(.responsive-hero-image) {
                        margin-top: 0 !important;
                    }
                }
                .banner-title-area-left {
                    text-align: left;
                    padding-left: 0 !important;
                    margin-left: 0 !important;
                }
                .hero-heading-container-justify {
                    justify-content: flex-start;
                }
                .hero-heading-text-align {
                    text-align: left;
                }
                .hero-section-title-wrapper {
                    justify-content: flex-start;
                    padding: 0 !important;
                    margin: 0 !important;
                }
                .hero-section-title-wrapper .hero-animated-text {
                    padding: 0 !important;
                    margin: 0 !important;
                }
                .hero-heading-text-align br {
                    display: block;
                    content: "";
                    margin-bottom: 4px;
                }
                @media (max-width: 575px) {
                    .hero-heading-text-align br {
                        display: block;
                        margin-bottom: 3px;
                        line-height: 1.2;
                    }
                }
                @media (min-width: 576px) {
                    .hero-heading-text-align br {
                        margin-bottom: 5px;
                    }
                }
                .swiper {
                    overflow: visible;
                    margin-bottom: 0;
                }
                .swiper-wrapper {
                    overflow: visible;
                    margin-bottom: 0;
                }
                .swiper-slide {
                    overflow: visible;
                    margin-bottom: 0;
                }
                .style1 {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    position: relative;
                    width: 100%;
                }
                .banner-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #ffffff;
                    z-index: 0;
                }
                .banner-container {
                    position: relative;
                    width: 100%;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    min-height: inherit;
                    padding: 0;
                }
                .banner-image-area {
                    margin-bottom: 0 !important;
                    padding-bottom: 0 !important;
                    width: 100%;
                }
                @media (min-width: 992px) {
                    .banner-image-area.responsive-hero-image-parent {
                        padding-top: 100px !important;
                    }
                }
                .banner-image-area img {
                    width: 100% !important;
                    height: auto !important;
                    max-width: 100%;
                    display: block;
                    object-fit: contain;
                }
                @media (min-width: 992px) {
                    .banner-image-area img {
                        max-width: 600px;
                    }
                }
                .slider-area .row {
                    margin-bottom: 0;
                    margin-left: 0;
                    margin-right: 0;
                }
                .slider-area .row > [class*="col-"] {
                    padding-left: 5px;
                    padding-right: 5px;
                    margin-bottom: 10px;
                }
                @media (min-width: 375px) {
                    .slider-area .row > [class*="col-"] {
                        padding-left: 8px;
                        padding-right: 8px;
                        margin-bottom: 12px;
                    }
                }
                @media (min-width: 576px) {
                    .slider-area .row > [class*="col-"] {
                        padding-left: 12px;
                        padding-right: 12px;
                        margin-bottom: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .slider-area .row > [class*="col-"] {
                        padding-left: 15px;
                        padding-right: 15px;
                        margin-bottom: 0;
                    }
                }
                .slider-area .container {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    width: 100%;
                    max-width: 100%;
                    padding-left: 10px;
                    padding-right: 10px;
                }
                @media (min-width: 375px) {
                    .slider-area .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                @media (min-width: 576px) {
                    .slider-area .container {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .slider-area .container {
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                }
                @media (min-width: 992px) {
                    .slider-area .container {
                        padding-left: 15px;
                        padding-right: 15px;
                        max-width: 1140px;
                    }
                }
                .heading-container {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    padding: 0 !important;
                    margin: 0 !important;
                }
                .heading-container .hero-animated-text {
                    padding: 0 !important;
                    margin: 0 !important;
                }
                .heading-slider-wrapper {
                    display: flex;
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform;
                }
                .heading-item {
                    min-width: 100%;
                    flex-shrink: 0;
                    padding: 0 !important;
                    line-height: 1.5 !important;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    word-break: break-word;
                    white-space: normal;
                    display: block;
                    width: 100%;
                    box-sizing: border-box;
                }
                .heading-item strong {
                    display: inline;
                    white-space: normal;
                }
                .heading-item span {
                    display: inline;
                    white-space: normal;
                }
                @media (min-width: 375px) {
                    .heading-item {
                        line-height: 1.6 !important;
                    }
                }
                @media (min-width: 576px) {
                    .heading-item {
                        line-height: 1.5 !important;
                    }
                }
                @media (min-width: 768px) {
                    .heading-item {
                        line-height: 1.4 !important;
                    }
                }
                @media (min-width: 992px) {
                    .heading-item {
                        line-height: 1.3 !important;
                    }
                }
                .banner-title-area-left {
                    width: 100%;
                }
                .banner-style1 {
                    width: 100% !important;
                    max-width: 100%;
                    padding: 0 !important;
                }
                .welcome-text {
                    width: 100%;
                    margin-bottom: 0;
                    text-align: left;
                }
                .welcome-text h1 {
                    margin-bottom: 5px;
                }
                @media (min-width: 375px) {
                    .welcome-text h1 {
                        margin-bottom: 6px;
                    }
                }
                @media (min-width: 576px) {
                    .welcome-text h1 {
                        margin-bottom: 8px;
                    }
                }
                @media (min-width: 768px) {
                    .welcome-text h1 {
                        margin-bottom: 10px;
                    }
                }
                @media (min-width: 992px) {
                    .welcome-text h1 {
                        margin-bottom: 15px;
                    }
                }
                .section-title {
                    width: 100%;
                    margin-bottom: 8px;
                    padding: 0 !important;
                    margin-top: 0 !important;
                }
                @media (min-width: 375px) {
                    .section-title {
                        margin-bottom: 10px;
                    }
                }
                @media (min-width: 576px) {
                    .section-title {
                        margin-bottom: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .section-title {
                        margin-bottom: 20px;
                    }
                }
                @media (min-width: 992px) {
                    .section-title {
                        margin-bottom: 30px;
                    }
                }
            `}} />
            <div className="slider-area border-bottom">
                <div className="swiper banner-slider">
                    <div className="swiper-wrapper">

                   
                    {heroContent.map((item, i) => (
                        <div key={i} className="swiper-slide">
                            <div className="style1 position-relative hero-min-height">
                                <div className="banner-background"></div>
                                <div className="banner-container">
                                    <div className="container">
                                        <div className="row align-items-center">
                                            {/* Left side - Animated text */}
                                            <div className="col-12 col-lg-6 order-1 order-lg-1">
                                                <div className="banner-title-area-left hero-padding">
                                                    <div className="banner-style1">
                                                        <div className="welcome-text hero-margin-bottom">
                                                            <h1 className={`hero-welcome-title ${isPageLoaded ? 'welcome-slide-left' : ''}`} style={{ color: '#0D5189', fontWeight: '700', fontFamily: 'inherit', textTransform: 'uppercase', lineHeight: '1.1', margin: 0, opacity: isPageLoaded ? 1 : 0 }}>
                                                                Welcome
                                                            </h1>
                                                            <div className={`hero-subtitle hero-subtitle-letter-spacing ${isPageLoaded ? 'welcome-slide-right' : ''}`} style={{ display: 'flex', flexDirection: 'column', color: '#0D5189', fontWeight: '600', fontFamily: 'inherit', textTransform: 'uppercase', opacity: isPageLoaded ? 1 : 0, alignItems: 'flex-start' }}>
                                                                <span style={{ color: '#0D5189' }}>to Omega SeaFoods</span>
                                                            </div>
                                                        </div>
                                                        <div className="section-title hero-section-title-wrapper">
                                                            <div className="hero-animated-text" style={{ color: '#0D5189', fontWeight: '600', fontFamily: 'inherit' }}>
                                                                <div className="heading-container hero-heading-container-height hero-heading-container-justify">
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
                                                                                    fontFamily: 'inherit'
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
                                            <div className="col-12 col-lg-6 order-2 order-lg-2">
                                                <div className="banner-image-area hero-padding responsive-hero-image-parent">
                                                    <div 
                                                        className={`${isPageLoaded ? 'image-slide-up' : ''} hero-image-padding responsive-hero-image`} 
                                                        style={{ 
                                                            opacity: isPageLoaded ? 1 : 0
                                                        }}
                                                    >
                                                        <Image
                                                            src="/assets/img/banner/banner2.webp"
                                                            alt="Tasty and Fresh Seafood"
                                                            width={1200}
                                                            height={400}
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'contain',
                                                                display: 'block'
                                                            }}
                                                            priority
                                                            sizes="(max-width: 991px) 100vw, 60vw"
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