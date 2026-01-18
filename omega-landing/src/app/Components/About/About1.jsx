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
        title:'Variety of flavours from american cuisine',
        content:'It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point established fact that',  
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
            `}} />
        <section className="about-us-section fix section-padding p-0 border border-gray-300 shadow">
        <div className="about-wrapper style1">
            <div className="shape3 d-none d-xxl-block"><Image src={aboutContent.img2} alt="img" className="cir36" width={280} height={350}   /></div>
            <div className="shape6 d-none d-xxl-block"><Image src={aboutContent.img4} alt="img" className="cir36" width={280} height={350}   /></div>
            <div className="shape5 d-none d-xxl-block"><Image src="/assets/img/shape/aboutShape1_5.png" alt="img" width={173} height={277}   /></div>
         
         
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