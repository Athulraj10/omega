"use client"
import { useState, useEffect, useRef } from "react";
import FoodItemCard from "../Card/FoodItemCard";
import Image from "next/image";
import { categories, productsByCategory } from "../../../data/products";

const FoodItem1 = () => {
    const [isActive, setIsActive] = useState('Frozen fish');
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const foodItemRef = useRef(null);
    const lastScrollY = useRef(0);

    // Helper function to split products into two columns
    const splitProducts = (products) => {
        const mid = Math.ceil(products.length / 2);
        return {
            left: products.slice(0, mid),
            right: products.slice(mid)
        };
    };

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
                        }, 50);
                    } else {
                        // Reset animation when leaving viewport
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: 0.05,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentRef = foodItemRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Fallback: always show after 1 second
        const fallbackTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(fallbackTimeout);
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Reset visibility when tab changes to trigger animations again
    useEffect(() => {
        setIsVisible(false);
        // Use requestAnimationFrame to ensure DOM is updated
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsVisible(true);
            }, 150);
        });
    }, [isActive]);

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .food-menu-section .product-item {
                    opacity: 0;
                    transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.8s ease-out;
                    will-change: transform, opacity, filter;
                }
                @keyframes showProduct {
                    to {
                        opacity: 1;
                        transform: translate(0, 0) rotateY(0deg) rotateZ(0deg) rotateX(0deg) scale(1);
                        filter: blur(0px);
                    }
                }
                .food-menu-section .product-item:not(.animate) {
                    animation: showProduct 0.5s ease-out 1.5s forwards;
                }
                /* Left side animations */
                .food-menu-section .product-item.slide-from-left {
                    transform: translateX(-100px) rotateY(-25deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-left.animate {
                    opacity: 1;
                    transform: translateX(0) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .food-menu-section .product-item.slide-from-bottom-left {
                    transform: translate(-80px, 80px) rotateZ(-20deg) rotateY(-10deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-bottom-left.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .food-menu-section .product-item.slide-from-top-left {
                    transform: translate(-80px, -80px) rotateZ(20deg) rotateY(-10deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-top-left.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                /* Right side animations */
                .food-menu-section .product-item.slide-from-right {
                    transform: translateX(100px) rotateY(25deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-right.animate {
                    opacity: 1;
                    transform: translateX(0) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .food-menu-section .product-item.slide-from-bottom-right {
                    transform: translate(80px, 80px) rotateZ(20deg) rotateY(10deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-bottom-right.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .food-menu-section .product-item.slide-from-top-right {
                    transform: translate(80px, -80px) rotateZ(-20deg) rotateY(10deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-top-right.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                /* Additional diagonal animations for more variety */
                .food-menu-section .product-item.slide-from-bottom {
                    transform: translateY(100px) rotateX(-20deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-bottom.animate {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg) scale(1);
                    filter: blur(0px);
                }
                .food-menu-section .product-item.slide-from-top {
                    transform: translateY(-100px) rotateX(20deg) scale(0.8);
                    filter: blur(4px);
                }
                .food-menu-section .product-item.slide-from-top.animate {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg) scale(1);
                    filter: blur(0px);
                }
                .food-menu-section .product-item.slide-from-center-left {
                    transform: translateX(-120px) rotateY(-30deg) rotateZ(10deg) scale(0.75);
                    filter: blur(5px);
                }
                .food-menu-section .product-item.slide-from-center-left.animate {
                    opacity: 1;
                    transform: translateX(0) rotateY(0deg) rotateZ(0deg) scale(1);
                    filter: blur(0px);
                }
                .food-menu-section .product-item.slide-from-center-right {
                    transform: translateX(120px) rotateY(30deg) rotateZ(-10deg) scale(0.75);
                    filter: blur(5px);
                }
                .food-menu-section .product-item.slide-from-center-right.animate {
                    opacity: 1;
                    transform: translateX(0) rotateY(0deg) rotateZ(0deg) scale(1);
                    filter: blur(0px);
                }
            `}} />
<section className="food-menu-section fix section-padding" style={{backgroundColor: '#fff'}}>
        {/* <div className="burger-shape">
                <Image src="/assets/img/shape/burger-shape.png" alt="img" width={148} height={160} />
        </div>
        <div className="fry-shape">
                <Image src="/assets/img/shape/fry-shape.png" alt="img" width={137} height={158} />
        </div> */}
        <div className="food-menu-wrapper style1">
            <div className="container">
                <div className="food-menu-tab-wrapper style-bg border border-gray-200 rounded-lg">
                    <div className="title-area">
                   
                        <h2 className="title wow fadeInUp" style={{ color: '#0D5189' }} data-wow-delay="0.7s">
                            Omega Foods Menu
                        </h2>
                    </div>

                    <div className="food-menu-tab">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className={`nav-item ${isActive === category.id ? 'active' : ''}`}
                                        onClick={() => setIsActive(category.id)}
                                        role="presentation"
                                    >
                                        <button
                                            className="nav-link"
                                            id={`${category.tabId}-tab`}
                                            data-bs-toggle="pill"
                                            data-bs-target={`#${category.tabId}`}
                                            type="button"
                                            role="tab"
                                            aria-controls={category.ariaControls}
                                            aria-selected={isActive === category.id}
                                        >
                                            <Image src={category.icon} alt={category.name} width={isActive === category.id ? 70 : 60} height={isActive === category.id ? 70 : 60}  />
                                            <span style={{ color: '#0D5189' }}>{category.name}</span>
                                        </button>
                            </li>
                                ))}
                        </ul>
                        <div ref={foodItemRef} className="tab-content" id="pills-tabContent">
                                {categories.map((category) => {
                                    const products = productsByCategory[category.id] || [];
                                    const { left, right } = splitProducts(products);
                                    const isFirstCategory = category.id === 'Frozen fish';
                                    const isActiveTab = isActive === category.id;
                                    
                                    return (
                                        <div
                                            key={category.id}
                                            className={`tab-pane ${isActiveTab ? 'active' : ''}`}
                                            id={category.tabId}
                                            role="tabpanel"
                                            aria-labelledby={`${category.tabId}-tab`}
                                            tabIndex="0"
                                        >
                                            <div className={`row ${isFirstCategory ? 'gx-60' : 'gx-30'}`}>
                                    <div className="col-lg-6">
                                                    {left.map((product, index) => {
                                                        // Different animation angles based on scroll direction
                                                        const downAnimations = [
                                                            'slide-from-left',
                                                            'slide-from-bottom-left',
                                                            'slide-from-bottom',
                                                            'slide-from-center-left',
                                                            'slide-from-bottom-left'
                                                        ];
                                                        const upAnimations = [
                                                            'slide-from-left',
                                                            'slide-from-top-left',
                                                            'slide-from-top',
                                                            'slide-from-center-left',
                                                            'slide-from-top-left'
                                                        ];
                                                        const animationClasses = scrollDirection === 'down' ? downAnimations : upAnimations;
                                                        const animClass = animationClasses[index % animationClasses.length];
                                                        const shouldAnimate = isVisible && isActiveTab;
                                                        
                                                        return (
                                                            <div 
                                                                key={product.id || index}
                                                                className={`product-item ${animClass} ${shouldAnimate ? 'animate' : ''}`}
                                                                style={{ transitionDelay: `${0.1 + index * 0.12}s` }}
                                                            >
                                                                <FoodItemCard
                                                                    img={product.img}
                                                                    title={product.title}
                                                                    content={product.content}
                                                                    price={product.price}
                                                                    productId={product.id}
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                    </div>
                                    <div className="col-lg-6">
                                                    {right.map((product, index) => {
                                                        // Different animation angles based on scroll direction
                                                        const downAnimations = [
                                                            'slide-from-right',
                                                            'slide-from-bottom-right',
                                                            'slide-from-bottom',
                                                            'slide-from-center-right',
                                                            'slide-from-bottom-right'
                                                        ];
                                                        const upAnimations = [
                                                            'slide-from-right',
                                                            'slide-from-top-right',
                                                            'slide-from-top',
                                                            'slide-from-center-right',
                                                            'slide-from-top-right'
                                                        ];
                                                        const animationClasses = scrollDirection === 'down' ? downAnimations : upAnimations;
                                                        const animClass = animationClasses[index % animationClasses.length];
                                                        const shouldAnimate = isVisible && isActiveTab;
                                                        
                                                        return (
                                                            <div 
                                                                key={product.id || index}
                                                                className={`product-item ${animClass} ${shouldAnimate ? 'animate' : ''}`}
                                                                style={{ transitionDelay: `${0.1 + index * 0.12}s` }}
                                                            >
                                                                <FoodItemCard
                                                                    img={product.img}
                                                                    title={product.title}
                                                                    content={product.content}
                                                                    price={product.price}
                                                                    productId={product.id}
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                    </div>
                                </div>
                            </div>
                                    );
                                })}
                            </div>
                        </div>
                </div>
            </div>
        </div>
      
    </section>
    </>
    );
};

export default FoodItem1;