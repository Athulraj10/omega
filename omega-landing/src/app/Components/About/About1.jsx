"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const About1 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const aboutRef = useRef(null);
    const lastScrollY = useRef(0);

    const aboutContent = {  
        img1:'/assets/img/shape/aboutShape1_1.png',  
        img2:'/assets/img/shape/aboutShape1_3.png',  
        img3:'/assets/img/shape/aboutShape1_4.png',  
        img4:'/assets/img/shape/aboutShape1_6.png',  
        subtitle:"About US",
        title:'Why Choose Omega Seafoods?',
        content:`40+ years of industry expertise 
         Abu Dhabi–based, UAE compliant operations
         Local & international seafood sourcing
         Strict hygiene & quality standards
         Reliable bulk and commercial supply`            
    }

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
                        // Small delay to ensure initial state is set before animation
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

        const currentRef = aboutRef.current;
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
                .about-us-section .title-area {
                    opacity: 0;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .about-us-section .title-area.slide-from-bottom {
                    transform: translateY(50px);
                }
                .about-us-section .title-area.slide-from-bottom.animate-from-bottom {
                    opacity: 1;
                    transform: translateY(0);
                }
                .about-us-section .title-area.slide-from-top {
                    transform: translateY(-50px);
                }
                .about-us-section .title-area.slide-from-top.animate-from-top {
                    opacity: 1;
                    transform: translateY(0);
                }
                .about-us-section .sub-title {
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                @media (min-width: 576px) {
                    .about-us-section .sub-title {
                        font-size: 16px;
                        margin-bottom: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .about-us-section .sub-title {
                        font-size: 18px;
                        margin-bottom: 20px;
                    }
                }
                .about-us-section .title {
                    font-size: 24px;
                    line-height: 1.3;
                    margin-bottom: 15px;
                }
                @media (min-width: 576px) {
                    .about-us-section .title {
                        font-size: 32px;
                        margin-bottom: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .about-us-section .title {
                        font-size: 40px;
                        margin-bottom: 25px;
                    }
                }
                @media (min-width: 992px) {
                    .about-us-section .title {
                        font-size: 48px;
                        margin-bottom: 30px;
                    }
                }
                .about-us-section .text {
                    font-size: 14px;
                    line-height: 1.6;
                    padding: 0 10px;
                }
                @media (min-width: 576px) {
                    .about-us-section .text {
                        font-size: 16px;
                        padding: 0 20px;
                    }
                }
                @media (min-width: 768px) {
                    .about-us-section .text {
                        font-size: 18px;
                        padding: 0 40px;
                    }
                }
                @media (min-width: 992px) {
                    .about-us-section .text {
                        font-size: 18px;
                        padding: 0 60px;
                    }
                }
                @media (min-width: 1200px) {
                    .about-us-section .text {
                        padding: 0 100px;
                    }
                }
                .about-us-section {
                    overflow-x: hidden;
                    position: relative;
                }
                .about-us-section .section-padding {
                    padding: 40px 0;
                }
                @media (min-width: 768px) {
                    .about-us-section .section-padding {
                        padding: 60px 0;
                    }
                }
                @media (min-width: 992px) {
                    .about-us-section .section-padding {
                        padding: 80px 0;
                    }
                }
                /* Mobile Decorative Images - Same size and animation as desktop */
                .about-us-section .mobile-shape-left,
                .about-us-section .mobile-shape-right {
                    position: absolute;
                    top: 200px;
                    bottom: auto;
                    z-index: 2;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 1s ease-out, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
                    will-change: transform, opacity;
                }
                .about-us-section .mobile-shape-left {
                    left: -10px;
                    transform: translateX(-50px) scale(0.8) rotate(-10deg);
                }
                .about-us-section .mobile-shape-right {
                    right: -10px;
                    transform: translateX(50px) scale(0.8) rotate(10deg);
                }
                .about-us-section .mobile-shape-left.animate,
                .about-us-section .mobile-shape-right.animate {
                    opacity: 1;
                    transform: translateX(0) scale(1) rotate(0deg);
                }
                /* Floating animation for mobile shapes */
                @keyframes floatMobileLeft {
                    0%, 100% {
                        transform: translateY(0px) rotate(-2deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(2deg);
                    }
                }
                @keyframes floatMobileRight {
                    0%, 100% {
                        transform: translateY(0px) rotate(2deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(-2deg);
                    }
                }
                .about-us-section .mobile-shape-left.animate {
                    animation: floatMobileLeft 4s ease-in-out infinite;
                    animation-delay: 1s;
                }
                .about-us-section .mobile-shape-right.animate {
                    animation: floatMobileRight 4s ease-in-out infinite;
                    animation-delay: 1.5s;
                }
                /* Mobile shape sizing - responsive */
                .about-us-section .mobile-shape-left img,
                .about-us-section .mobile-shape-right img {
                    width: 100px !important;
                    height: 125px !important;
                    object-fit: contain;
                }
                @media (min-width: 375px) {
                    .about-us-section .mobile-shape-left img,
                    .about-us-section .mobile-shape-right img {
                        width: 120px !important;
                        height: 150px !important;
                    }
                }
                @media (min-width: 576px) {
                    .about-us-section .mobile-shape-left {
                        left: -15px;
                        top: 140px;
                    }
                    .about-us-section .mobile-shape-right {
                        right: -15px;
                        top: 140px;
                    }
                    .about-us-section .mobile-shape-left img,
                    .about-us-section .mobile-shape-right img {
                        width: 140px !important;
                        height: 175px !important;
                    }
                }
                @media (min-width: 768px) {
                    .about-us-section .mobile-shape-left {
                        left: 0;
                    }
                    .about-us-section .mobile-shape-right {
                        right: 0;
                    }
                    .about-us-section .mobile-shape-left img,
                    .about-us-section .mobile-shape-right img {
                        width: 160px !important;
                        height: 200px !important;
                    }
                }
                @media (min-width: 992px) {
                    .about-us-section .mobile-shape-left img,
                    .about-us-section .mobile-shape-right img {
                        width: 180px !important;
                        height: 225px !important;
                    }
                }
                /* Hide mobile shapes on xxl screens where desktop shapes show */
                @media (min-width: 1400px) {
                    .about-us-section .mobile-shape-left,
                    .about-us-section .mobile-shape-right {
                        display: none !important;
                    }
                }
            `}} />
        <section className="about-us-section fix section-padding p-0 border border-gray-300 shadow">
        <div className="about-wrapper style1">
            {/* Desktop decorative shapes - visible on xxl screens */}
            <div className="shape3 d-none d-xxl-block"><Image src={aboutContent.img2} alt="img" className="cir36" width={280} height={350}   /></div>
            <div className="shape6 d-none d-xxl-block"><Image src={aboutContent.img4} alt="img" className="cir36" width={280} height={350}   /></div>
            <div className="shape5 d-none d-xxl-block"><Image src="/assets/img/shape/aboutShape1_5.png" alt="img" width={173} height={277}   /></div>
            
            {/* Mobile decorative shapes - visible below xxl screens, same size & animation as desktop */}
            <div className={`mobile-shape-left d-xxl-none ${isVisible ? 'animate' : ''}`}>
                <Image src={aboutContent.img2} alt="decorative seafood" width={180} height={225} />
            </div>
            <div className={`mobile-shape-right d-xxl-none ${isVisible ? 'animate' : ''}`}>
                <Image src={aboutContent.img4} alt="decorative seafood" width={180} height={225} />
            </div>
         
         
            <div className="container">
                <div className="about-us section-padding">
                    <div className="row">
                        <div className="col-12">
                            <div 
                                ref={aboutRef}
                                className={`title-area ${isVisible ? (scrollDirection === 'down' ? 'slide-from-bottom animate-from-bottom' : 'slide-from-top animate-from-top') : (scrollDirection === 'down' ? 'slide-from-bottom' : 'slide-from-top')}`}
                            >
                                <div className="sub-title text-center wow fadeInUp " style={{ color: '#0D5189' }} data-wow-delay="0.5s">
                                    {aboutContent.subtitle}
                                </div>
                                <h2 className="title wow fadeInUp text-md" style={{ color: '#0D5189' }} data-wow-delay="0.7s">
                                {aboutContent.title}
                                </h2>
                                <div className="text wow fadeInUp" style={{ color: '#0D5189' }} data-wow-delay="0.8s">{aboutContent.content}</div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    );
};

export default About1;