"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const CtaBanner1 = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const ctaRef = useRef(null);
    const lastScrollY = useRef(0);

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

        const currentRef = ctaRef.current;
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
                .cta-section {
                    overflow-x: hidden;
                    padding: 30px 0;
                }
                @media (min-width: 576px) {
                    .cta-section {
                        padding: 40px 0;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section {
                        padding: 50px 0;
                    }
                }
                @media (min-width: 992px) {
                    .cta-section {
                        padding: 60px 0;
                    }
                }
                .cta-section .container {
                    padding-left: 15px;
                    padding-right: 15px;
                }
                @media (min-width: 576px) {
                    .cta-section .container {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .container {
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                }
                .cta-section .cta-content {
                    opacity: 0;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .cta-section .cta-content.slide-from-top {
                    transform: translateY(-30px);
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content.slide-from-top {
                        transform: translateY(-50px);
                    }
                }
                .cta-section .cta-content.slide-from-top.animate-from-top {
                    opacity: 1;
                    transform: translateY(0);
                }
                .cta-section .cta-content.slide-from-bottom {
                    transform: translateY(30px);
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content.slide-from-bottom {
                        transform: translateY(50px);
                    }
                }
                .cta-section .cta-content.slide-from-bottom.animate-from-bottom {
                    opacity: 1;
                    transform: translateY(0);
                }
                .cta-section .cta-content-item {
                    opacity: 0;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .cta-section .cta-content-item.slide-from-left {
                    transform: translateX(-30px);
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content-item.slide-from-left {
                        transform: translateX(-50px);
                    }
                }
                .cta-section .cta-content-item.slide-from-left.animate-from-left {
                    opacity: 1;
                    transform: translateX(0);
                }
                .cta-section .cta-content-item.slide-from-right {
                    transform: translateX(30px);
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content-item.slide-from-right {
                        transform: translateX(50px);
                    }
                }
                .cta-section .cta-content-item.slide-from-right.animate-from-right {
                    opacity: 1;
                    transform: translateX(0);
                }
                .cta-section .cta-content h3 {
                    font-size: 16px !important;
                    line-height: 1.1 !important;
                    margin-bottom: 10px;
                    padding: 0 10px;
                }
                @media (min-width: 375px) {
                    .cta-section .cta-content h3 {
                        font-size: 18px !important;
                        line-height: 1.15 !important;
                        margin-bottom: 12px;
                    }
                }
                @media (min-width: 576px) {
                    .cta-section .cta-content h3 {
                        font-size: 24px !important;
                        line-height: 1.2 !important;
                        margin-bottom: 18px;
                        padding: 0 15px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content h3 {
                        font-size: 28px !important;
                        line-height: 1.2 !important;
                        margin-bottom: 20px;
                        padding: 0 20px;
                    }
                }
                @media (min-width: 992px) {
                    .cta-section .cta-content h3 {
                        font-size: 36px !important;
                        line-height: 1.25 !important;
                        margin-bottom: 24px;
                        padding: 0;
                    }
                }
                .cta-section .cta-content p {
                    font-size: 11px !important;
                    line-height: 1.5;
                    padding: 0 15px;
                    margin-bottom: 0;
                }
                @media (min-width: 375px) {
                    .cta-section .cta-content p {
                        font-size: 12px !important;
                    }
                }
                @media (min-width: 576px) {
                    .cta-section .cta-content p {
                        font-size: 14px !important;
                        padding: 0 20px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content p {
                        font-size: 16px !important;
                        padding: 0 30px;
                    }
                }
                @media (min-width: 992px) {
                    .cta-section .cta-content p {
                        font-size: 18px !important;
                        padding: 0;
                    }
                }
                .cta-section .cta-wrap {
                    margin-bottom: 20px;
                }
                @media (min-width: 768px) {
                    .cta-section .cta-wrap {
                        margin-bottom: 0;
                    }
                }
                .cta-section .row.mb-5 {
                    margin-bottom: 30px !important;
                }
                @media (min-width: 576px) {
                    .cta-section .row.mb-5 {
                        margin-bottom: 40px !important;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .row.mb-5 {
                        margin-bottom: 50px !important;
                    }
                }
                .cta-section .cta-thumb {
                    height: 220px;
                    position: relative;
                    overflow: hidden;
                    border-radius: 8px;
                }
                @media (min-width: 375px) {
                    .cta-section .cta-thumb {
                        height: 240px;
                    }
                }
                @media (min-width: 576px) {
                    .cta-section .cta-thumb {
                        height: 280px;
                        border-radius: 12px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-thumb {
                        height: 320px;
                    }
                }
                @media (min-width: 992px) {
                    .cta-section .cta-thumb {
                        height: 350px;
                        border-radius: 16px;
                    }
                }
                .cta-section .cta-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .cta-section .cta-thumb-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%);
                    padding: 15px;
                    z-index: 2;
                }
                @media (min-width: 375px) {
                    .cta-section .cta-thumb-overlay {
                        padding: 18px;
                    }
                }
                @media (min-width: 576px) {
                    .cta-section .cta-thumb-overlay {
                        padding: 25px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-thumb-overlay {
                        padding: 30px;
                    }
                }
                @media (min-width: 992px) {
                    .cta-section .cta-thumb-overlay {
                        padding: 35px;
                    }
                }
                .cta-section .cta-thumb-overlay h4 {
                    color: #ffffff !important;
                    margin-bottom: 6px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
                    font-size: 14px !important;
                    line-height: 1.3;
                }
                @media (min-width: 375px) {
                    .cta-section .cta-thumb-overlay h4 {
                        font-size: 15px !important;
                        margin-bottom: 8px;
                    }
                }
                @media (min-width: 576px) {
                    .cta-section .cta-thumb-overlay h4 {
                        font-size: 20px !important;
                        margin-bottom: 12px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-thumb-overlay h4 {
                        font-size: 22px !important;
                        margin-bottom: 14px;
                    }
                }
                .cta-section .cta-thumb-overlay p {
                    color: #ffffff !important;
                    margin-bottom: 0;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
                    font-size: 11px !important;
                    line-height: 1.4;
                }
                @media (min-width: 375px) {
                    .cta-section .cta-thumb-overlay p {
                        font-size: 12px !important;
                    }
                }
                @media (min-width: 576px) {
                    .cta-section .cta-thumb-overlay p {
                        font-size: 14px !important;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-thumb-overlay p {
                        font-size: 15px !important;
                    }
                }
                .cta-section .cta-content-item {
                    margin-bottom: 20px;
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content-item {
                        margin-bottom: 0;
                    }
                }
                .cta-boat-image {
                    display: none;
                }
                @media (min-width: 992px) {
                    .cta-boat-image {
                        display: block;
                        width: 280px !important;
                        height: 280px !important;
                        max-width: 280px !important;
                        max-height: 280px !important;
                    }
                }
                @media (min-width: 1200px) {
                    .cta-boat-image {
                        width: 400px !important;
                        height: 400px !important;
                        max-width: 400px !important;
                        max-height: 350px !important;
                    }
                }
                @media (min-width: 1400px) {
                    .cta-boat-image {
                        width: 450px !important;
                        height: 450px !important;
                        max-width: 450px !important;
                        max-height: 350px !important;
                    }
                }
            `}} />
        <section className="cta-section fix pt-5">
        <div className="cta-wrapper style1 p-0">
            <div className="container">
                <div ref={ctaRef} className="cta-wrap style1">
                    {/* Main Heading and Description */}
                    <div className="row mb-5">
                        <div className="col-12">
                            <div 
                                className={`cta-content text-center ${scrollDirection === 'down' ? 'slide-from-bottom' : 'slide-from-top'} ${isVisible ? (scrollDirection === 'down' ? 'animate-from-bottom' : 'animate-from-top') : ''}`}
                            >
                                <h3 className="wow fadeInUp" data-wow-delay="0.5s" style={{ color: '#0D5189', fontWeight: 'bold' }}>
                                    Ensuring Freshness & Quality in Every Step
                                </h3>
                                <p className="wow fadeInUp" data-wow-delay="0.7s" style={{ color: '#0D5189', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                                    At Omega Seafoods, we adhere to the highest standards of hygiene and quality. From careful handling of freshly caught fish to expert packaging in insulated Styrofoam boxes, our dedicated team works diligently in a state-of-the-art facility to ensure that every product meets our strict freshness and safety standards.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Two Image Sections */}
                    <div className="row g-3 g-md-4">
                        {/* Left Section - Precision in Processing */}
                        <div className="col-12 col-md-6 col-lg-6 mb-3 mb-md-4 mb-lg-0">
                            <div className={`cta-content-item slide-from-left ${isVisible ? 'animate-from-left' : ''} wow fadeInUp`} data-wow-delay="0.8s">
                                <div className="cta-thumb mb-3 mb-md-4">
                                    <Image 
                                        className="img-fluid rounded" 
                                        src="/assets/img/cta/processing no bg (1).webp" 
                                        alt="Precision in Processing" 
                                        width={500} 
                                        height={300}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                        priority={false}
                                    />
                                    <div className="cta-thumb-overlay">
                                        <h4 style={{ fontWeight: 'bold' }}>
                                            Precision in Processing
                                        </h4>
                                        <p style={{ lineHeight: '1.6' }}>
                                            Our team carefully prepares and inspect fresh fish to maintain top quality.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Secure Packaging */}
                        <div className="col-12 col-md-6 col-lg-6 mb-3 mb-md-0">
                            <div className={`cta-content-item slide-from-right ${isVisible ? 'animate-from-right' : ''} wow fadeInUp`} data-wow-delay="1s">
                                <div className="cta-thumb mb-3 mb-md-4">
                                    <Image 
                                        className="img-fluid rounded" 
                                        src="/assets/img/cta/packed fish in chiller.webp" 
                                        alt="Secure Packaging" 
                                        width={500} 
                                        height={300}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                        priority={false}
                                    />
                                    <div className="cta-thumb-overlay">
                                        <h4 style={{ fontWeight: 'bold' }}>
                                            Secure Packaging
                                        </h4>
                                        <p style={{ lineHeight: '1.6' }}>
                                            We use insulated boxes to keep seafood fresh and safe during transport.
                                        </p>
                                    </div>
                                    {pathname !== '/about' && (
                                        <Image 
                                            className="img-fluid rounded cta-boat-image" 
                                            src="/assets/img/cta/boat picture.webp" 
                                            alt="Boat" 
                                            width={200} 
                                            height={250} 
                                            style={{ 
                                                position: 'absolute',
                                                right: 0,
                                                left: '70%',
                                                top: '100%',
                                                transform: 'translateY(-70%)',
                                                objectFit: 'contain',
                                                zIndex: 3
                                            }} 
                                            sizes="(min-width: 992px) 300px, (min-width: 1200px) 400px, (min-width: 1400px) 450px"
                                        />
                                    )}
                                </div>
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

export default CtaBanner1;