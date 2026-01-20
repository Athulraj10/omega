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
                .cta-section .cta-content {
                    opacity: 0;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .cta-section .cta-content.slide-from-top {
                    transform: translateY(-50px);
                }
                .cta-section .cta-content.slide-from-top.animate-from-top {
                    opacity: 1;
                    transform: translateY(0);
                }
                .cta-section .cta-content.slide-from-bottom {
                    transform: translateY(50px);
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
                    transform: translateX(-50px);
                }
                .cta-section .cta-content-item.slide-from-left.animate-from-left {
                    opacity: 1;
                    transform: translateX(0);
                }
                .cta-section .cta-content-item.slide-from-right {
                    transform: translateX(50px);
                }
                .cta-section .cta-content-item.slide-from-right.animate-from-right {
                    opacity: 1;
                    transform: translateX(0);
                }
                .cta-section .cta-content h3 {
                    font-size: 24px;
                    margin-bottom: 15px;
                }
                @media (min-width: 576px) {
                    .cta-section .cta-content h3 {
                        font-size: 28px;
                        margin-bottom: 18px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content h3 {
                        font-size: 32px;
                        margin-bottom: 20px;
                    }
                }
                @media (min-width: 992px) {
                    .cta-section .cta-content h3 {
                        font-size: 40px;
                        margin-bottom: 24px;
                    }
                }
                .cta-section .cta-content p {
                    font-size: 14px;
                    line-height: 1.6;
                    padding: 0 10px;
                }
                @media (min-width: 576px) {
                    .cta-section .cta-content p {
                        font-size: 16px;
                        padding: 0 15px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content p {
                        font-size: 18px;
                        padding: 0 20px;
                    }
                }
                @media (min-width: 992px) {
                    .cta-section .cta-content p {
                        font-size: 20px;
                        padding: 0;
                    }
                }
                .cta-section .cta-thumb {
                    height: 250px;
                }
                @media (min-width: 576px) {
                    .cta-section .cta-thumb {
                        height: 280px;
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
                    }
                }
                .cta-section .cta-content-item h4 {
                    font-size: 20px;
                    margin-bottom: 12px;
                }
                @media (min-width: 576px) {
                    .cta-section .cta-content-item h4 {
                        font-size: 22px;
                        margin-bottom: 14px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content-item h4 {
                        font-size: 24px;
                        margin-bottom: 16px;
                    }
                }
                .cta-section .cta-content-item p {
                    font-size: 14px;
                    line-height: 1.5;
                }
                @media (min-width: 576px) {
                    .cta-section .cta-content-item p {
                        font-size: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .cta-section .cta-content-item p {
                        font-size: 16px;
                    }
                }
                .cta-boat-image {
                    display: none;
                }
                @media (min-width: 992px) {
                    .cta-boat-image {
                        display: block;
                        width: 300px !important;
                        height: 300px !important;
                        max-width: 300px !important;
                        max-height: 300px !important;
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
                .cta-section .cta-content-item p {
                    position: relative;
                    overflow: hidden;
                }
                .cta-section {
                    overflow-x: hidden;
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
                                <p className="wow fadeInUp" data-wow-delay="0.7s" style={{ color: '#0D5189', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
                                    At Omega Seafoods, we adhere to the highest standards of hygiene and quality. From careful handling of freshly caught fish to expert packaging in insulated Styrofoam boxes, our dedicated team works diligently in a state-of-the-art facility to ensure that every product meets our strict freshness and safety standards.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Two Image Sections */}
                    <div className="row">
                        {/* Left Section - Precision in Processing */}
                        <div className="col-lg-6 col-md-6 mb-4 mb-lg-0">
                            <div className={`cta-content-item slide-from-left ${isVisible ? 'animate-from-left' : ''} wow fadeInUp`} data-wow-delay="0.8s">
                                <div className="cta-thumb mb-4">
                                    <Image 
                                        className="img-fluid rounded" 
                                        src="/assets/img/cta/processing no bg (1).webp" 
                                        alt="Precision in Processing" 
                                        width={500} 
                                        height={300}
                                        style={{ objectFit:  'cover', width: '100%' }}
                                    />
                                </div>
                                <h4 style={{ color: '#0D5189', fontWeight: 'bold' }}>
                                    Precision in Processing
                                </h4>
                                <p style={{ color: '#0D5189', lineHeight: '1.6' }}>
                                    Our team carefully prepares and inspect fresh fish to maintain top quality.
                                </p>
                            </div>
                        </div>

                        {/* Right Section - Secure Packaging */}
                        <div className="col-lg-6 col-md-6">
                            <div className={`cta-content-item slide-from-right ${isVisible ? 'animate-from-right' : ''} wow fadeInUp`} data-wow-delay="1s">
                                <div className="cta-thumb mb-4">
                                    <Image 
                                        className="img-fluid rounded" 
                                        src="/assets/img/cta/packed fish in chiller.webp" 
                                        alt="Secure Packaging" 
                                        width={500} 
                                        height={300}
                                        style={{ objectFit: 'cover', width: '100%' }}
                                    />
                                </div>
                                <h4 style={{ color: '#0D5189', fontWeight: 'bold' }}>
                                    Secure Packaging
                                </h4>
                                <p style={{ color: '#0D5189', lineHeight: '1.6', position: 'relative' }}>
                                    We use insulated boxes to keep seafood fresh and safe during transport.
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
                                            zIndex: 1
                                        }} 
                                    />
                                    )}
                                </p>
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