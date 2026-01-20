"use client"
import { useEffect, useState, useRef } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
const Offer1 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const offerRef = useRef(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        loadBackgroudImages();
    }, []);

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

        const currentRef = offerRef.current;
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

      const offerItems = [
        {
          img:'/assets/img/offer/offerThumb1_1.png', 
          icon:'bi-check-circle',
          title:'PREMIUM SEAFOOD QUALITY', 
          content:'Delivering fresh, safe, and premium-quality seafood for <strong>more than 40 years.</strong> <Br>Our commitment to quality has never changed.', 
          slogan:'Trusted Quality Since 40+ Years'
        },      
        {
          img:'/assets/img/offer/offerThumb1_2.png', 
          icon:'bi-truck',
          title:'RELIABLE SUPPLY', 
          content:'Consistent sourcing, timely delivery, and dependable service <Br> Your reliable seafood partner every day.', 
          slogan:'Reliability Built Over Decades'
        },      
      ]; 

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .offer-section .offer-card {
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                }
                .offer-section .row {
                    gap: 1rem;
                    display: flex;
                    flex-wrap: wrap;
                }
                @media (min-width: 768px) {
                    .offer-section .row {
                        flex-wrap: nowrap;
                    }
                    .offer-section .col-md-6 {
                        padding-left: .5rem;
                        padding-right: .5rem;
                        flex: 0 0 50%;
                        max-width: 50%;
                    }
                }
                .offer-section .offer-card {
                    opacity: 0;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .offer-section .offer-card.slide-from-left {
                    transform: translateX(-50px);
                }
                .offer-section .offer-card.slide-from-left.animate-from-left {
                    opacity: 1;
                    transform: translateX(0);
                }
                .offer-section .offer-card.slide-from-right {
                    transform: translateX(50px);
                }
                .offer-section .offer-card.slide-from-right.animate-from-right {
                    opacity: 1;
                    transform: translateX(0);
                }
                .offer-section-responsive {
                    padding: 40px 15px;
                }
                @media (min-width: 576px) {
                    .offer-section-responsive {
                        padding: 50px 20px;
                    }
                }
                @media (min-width: 768px) {
                    .offer-section-responsive {
                        padding: 60px 30px;
                    }
                }
                @media (min-width: 992px) {
                    .offer-section-responsive {
                        padding: 70px 40px;
                    }
                }
                .offer-section .offer-card {
                    padding: 15px;
                }
                @media (min-width: 576px) {
                    .offer-section .offer-card {
                        padding: 18px;
                    }
                }
                @media (min-width: 768px) {
                    .offer-section .offer-card {
                        padding: 20px;
                    }
                }
                .offer-section {
                    overflow-x: hidden;
                }
                .offer-section .offer-card {
                    min-height: 300px;
                }
                @media (min-width: 576px) {
                    .offer-section .offer-card {
                        min-height: 350px;
                    }
                }
                @media (min-width: 768px) {
                    .offer-section .offer-card {
                        min-height: 400px;
                    }
                }
                .offer-section .offer-title-line {
                    font-size: 18px;
                }
                @media (min-width: 576px) {
                    .offer-section .offer-title-line {
                        font-size: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .offer-section .offer-title-line {
                        font-size: 24px;
                    }
                }
                .offer-section .offer-description-line {
                    font-size: 14px;
                }
                @media (min-width: 576px) {
                    .offer-section .offer-description-line {
                        font-size: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .offer-section .offer-description-line {
                        font-size: 16px;
                    }
                }
            `}} />
        <div className="offer-section fix bg-color2 offer-section-responsive">
        <div className="offer-wrapper">
            <div className="container">
                <div ref={offerRef} className="row" style={{ gap: 'calc(2rem + 20px)' }}>
                {offerItems.map((item, i) => {
                    let positionClass = '';
                    let animateClass = '';
                    
                    if (i === 0) {
                        // Left image
                        positionClass = 'slide-from-left';
                        animateClass = isVisible ? 'animate-from-left' : '';
                    } else if (i === 1) {
                        // Right image
                        positionClass = 'slide-from-right';
                        animateClass = isVisible ? 'animate-from-right' : '';
                    }
                    
                    return (
                    <div key={i} className="col-12 col-md-6 col-lg-6" style={{ padding: '1rem', flex: '0 0 auto', minWidth: 0 }}>
                        <div className={`offer-card style1-line wow fadeInUp ${positionClass} ${animateClass}`} style={{backgroundImage: `url(${item.img})`, maxWidth: '100%', margin: '0 auto', padding: '20px', width: '100%'}} data-wow-delay="0.2s">  
                            <div className="offer-content-line">
                                <div className="offer-title-wrapper-line">
                                    <i className={`bi ${item.icon} offer-icon-line`}></i>
                                    <h3 className="offer-title-line">{item.title}</h3>
                                </div>
                                <p className="offer-description-line" dangerouslySetInnerHTML={{__html: item.content}}></p>
                                <span className="offer-slogan-line">{item.slogan}</span>
                            </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default Offer1;