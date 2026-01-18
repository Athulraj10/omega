"use client"
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import { foodItems1Products } from "@/data/products";

const FoodItems1 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const foodItemsRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        // Reset animation when element leaves viewport
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
            }
        );

        const currentRef = foodItemsRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .best-food-items-section {
                    background-color: #fff;
                    padding: 60px 0;
                }
                .best-food-items-section .title-area .title {
                    color: #0D5189 !important;
                    margin-bottom: 40px;
                }
                .best-food-items-section .food-items-grid {
                    display: block;
                    max-width: 1200px;
                    margin: 0 auto;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .best-food-items-section .food-items-grid.food-items-slide-up {
                    opacity: 1;
                    transform: translateY(0);
                }
                .best-food-items-section .food-items-grid .slick-slide {
                    padding: 0 15px;
                }
                .best-food-items-section .food-items-grid .slick-list {
                    margin: 0 -15px;
                }
                .best-food-items-section .single-food-items {
                    background-color: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
                    transition: box-shadow 0.3s ease, transform 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .best-food-items-section .single-food-items:hover {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
                    transform: translateY(-4px);
                }
                .best-food-items-section .item-thumb {
                    width: 100%;
                    aspect-ratio: 1;
                    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .best-food-items-section .item-thumb .food-item-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .best-food-items-section .item-thumb .circle-shape {
                    display: none;
                }
                .best-food-items-section .item-content {
               
                    text-align: center;
                    background-color: #fff;
                }
                .best-food-items-section .single-food-items .item-content h3 {
                    color: #0D5189 !important;
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    line-height: 1.3;
                }
                .best-food-items-section .single-food-items .item-content .text {
                    color: #0D5189 !important;
                    font-size: 15px;
                    font-weight: 400;
                    margin-bottom: 0;
                    line-height: 1.4;
                }
                .best-food-items-section .single-food-items .item-content h6 {
                    display: none;
                }
            `}} />
        <section className="best-food-items-section">
        <div className="best-food-wrapper">
            <div className="container">
                <div className="title-area">
                    <h2 className="title wow fadeInUp text-center" data-wow-delay="0.7s" style={{ color: '#0D5189' }}>
                        Popular Fresh Fish
                    </h2>
                </div>
                <div className="food-items-container">
                    <div ref={foodItemsRef} className={`food-items-grid ${isVisible ? 'food-items-slide-up' : ''}`}>
                        <Slider {...settings}>
                            {foodItems1Products.map((item) => (
                                <div key={item.id} className="single-food-items">
                                    <div className="item-thumb">
                                        <Image 
                                            src={item.img} 
                                            width={500} 
                                            height={500} 
                                            alt={item.title} 
                                            className="food-item-img"
                                            style={{ width: '100%', height: '100%', objectFit: 'contain',borderRadius: '0%' }}
                                        />
                                    </div>
                                    <div className="item-content">
                                        <Link href="/menu" style={{ textDecoration: 'none' }}>
                                            <h3>{item.title}</h3>
                                        </Link>
                                        <div className="text">{item.content}</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    );
};

export default FoodItems1;