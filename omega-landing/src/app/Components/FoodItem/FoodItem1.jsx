"use client"
import { useState, useEffect, useRef } from "react";
import FoodItemCard from "../Card/FoodItemCard";
import Image from "next/image";
import { categories, productsByCategory } from "../../../data/products";

const FoodItem1 = () => {
    const [isActive, setIsActive] = useState('Frozen fish');
    const [isVisible, setIsVisible] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const foodItemRef = useRef(null);
    const titleRef = useRef(null);
    const navRef = useRef(null);
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

        const titleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsTitleVisible(true);
                    } else {
                        setIsTitleVisible(false);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsNavVisible(true);
                    } else {
                        setIsNavVisible(false);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentRef = foodItemRef.current;
        const currentTitleRef = titleRef.current;
        const currentNavRef = navRef.current;
        
        if (currentRef) {
            observer.observe(currentRef);
        }

        if (currentTitleRef) {
            titleObserver.observe(currentTitleRef);
        }

        if (currentNavRef) {
            navObserver.observe(currentNavRef);
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
            if (currentTitleRef) {
                titleObserver.unobserve(currentTitleRef);
            }
            if (currentNavRef) {
                navObserver.unobserve(currentNavRef);
            }
            observer.disconnect();
            titleObserver.disconnect();
            navObserver.disconnect();
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
                .food-menu-section .title {
                    font-size: 20px !important;
                    line-height: 1.2;
                    margin-bottom: 15px;
                    padding: 0 10px;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .food-menu-section .title.title-slide-up {
                    opacity: 1;
                    transform: translateY(0);
                }
                @media (min-width: 375px) {
                    .food-menu-section .title {
                        font-size: 22px !important;
                        margin-bottom: 18px;
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-section .title {
                        font-size: 28px !important;
                        margin-bottom: 25px;
                        padding: 0 15px;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-section .title {
                        font-size: 36px !important;
                        margin-bottom: 30px;
                        padding: 0;
                    }
                }
                @media (min-width: 992px) {
                    .food-menu-section .title {
                        font-size: 44px !important;
                        margin-bottom: 40px;
                    }
                }
                @media (min-width: 1200px) {
                    .food-menu-section .title {
                        font-size: 48px !important;
                    }
                }
                .food-menu-section .nav-item {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                .food-menu-section .nav-item.nav-item-slide-up {
                    opacity: 1;
                    transform: translateY(0);
                }
                .food-menu-section .nav-pills {
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 20px !important;
                }
                @media (min-width: 375px) {
                    .food-menu-section .nav-pills {
                        gap: 10px;
                        margin-bottom: 25px !important;
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-section .nav-pills {
                        margin-bottom: 30px !important;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-section .nav-pills {
                        flex-wrap: nowrap;
                        gap: 0;
                        margin-bottom: 30px !important;
                    }
                }
                .food-menu-section .nav-item {
                    flex: 1 1 calc(50% - 5px);
                    min-width: 0;
                    max-width: calc(50% - 5px);
                }
                @media (min-width: 375px) {
                    .food-menu-section .nav-item {
                        flex: 1 1 calc(33.333% - 7px);
                        max-width: calc(33.333% - 7px);
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-section .nav-item {
                        flex: 1 1 auto;
                        min-width: 100px;
                        max-width: none;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-section .nav-item {
                        flex: 0 0 auto;
                        min-width: auto;
                        max-width: none;
                    }
                }
                .food-menu-section .nav-link {
                    padding: 8px 10px !important;
                    font-size: 10px !important;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    width: 100%;
                    text-align: center;
                }
                @media (min-width: 375px) {
                    .food-menu-section .nav-link {
                        padding: 10px 12px !important;
                        font-size: 11px !important;
                        gap: 6px;
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-section .nav-link {
                        padding: 12px 16px !important;
                        font-size: 12px !important;
                        gap: 8px;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-section .nav-link {
                        padding: 15px 20px !important;
                        font-size: 13px !important;
                        gap: 8px;
                    }
                }
                @media (min-width: 992px) {
                    .food-menu-section .nav-link {
                        font-size: 14px !important;
                    }
                }
                .food-menu-section .nav-link img {
                    width: 35px !important;
                    height: 35px !important;
                }
                @media (min-width: 375px) {
                    .food-menu-section .nav-link img {
                        width: 40px !important;
                        height: 40px !important;
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-section .nav-link img {
                        width: 50px !important;
                        height: 50px !important;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-section .nav-link img {
                        width: 60px !important;
                        height: 60px !important;
                    }
                }
                @media (min-width: 992px) {
                    .food-menu-section .nav-link img {
                        width: 70px !important;
                        height: 70px !important;
                    }
                }
                .food-menu-section .col-lg-6 {
                    margin-bottom: 15px;
                    padding-left: 10px;
                    padding-right: 10px;
                }
                @media (min-width: 576px) {
                    .food-menu-section .col-lg-6 {
                        margin-bottom: 20px;
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                @media (min-width: 992px) {
                    .food-menu-section .col-lg-6 {
                        margin-bottom: 0;
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                .food-menu-tab-icon {
                    width: 35px !important;
                    height: 35px !important;
                    object-fit: contain;
                }
                .food-menu-tab-icon-active {
                    width: 38px !important;
                    height: 38px !important;
                }
                @media (min-width: 375px) {
                    .food-menu-tab-icon {
                        width: 40px !important;
                        height: 40px !important;
                    }
                    .food-menu-tab-icon-active {
                        width: 43px !important;
                        height: 43px !important;
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-tab-icon {
                        width: 50px !important;
                        height: 50px !important;
                    }
                    .food-menu-tab-icon-active {
                        width: 55px !important;
                        height: 55px !important;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-tab-icon {
                        width: 60px !important;
                        height: 60px !important;
                    }
                    .food-menu-tab-icon-active {
                        width: 65px !important;
                        height: 65px !important;
                    }
                }
                @media (min-width: 992px) {
                    .food-menu-tab-icon {
                        width: 70px !important;
                        height: 70px !important;
                    }
                    .food-menu-tab-icon-active {
                        width: 75px !important;
                        height: 75px !important;
                    }
                }
                .food-menu-section .food-menu-tab-wrapper {
                    padding: 15px 10px;
                    margin: 0 10px;
                }
                @media (min-width: 375px) {
                    .food-menu-section .food-menu-tab-wrapper {
                        padding: 18px 15px;
                        margin: 0 15px;
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-section .food-menu-tab-wrapper {
                        padding: 30px 20px;
                        margin: 0;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-section .food-menu-tab-wrapper {
                        padding: 40px 30px;
                    }
                }
                @media (min-width: 992px) {
                    .food-menu-section .food-menu-tab-wrapper {
                        padding: 50px 40px;
                    }
                }
                .food-menu-section {
                    overflow-x: hidden;
                }
                .food-menu-section .container {
                    padding-left: 10px;
                    padding-right: 10px;
                }
                @media (min-width: 375px) {
                    .food-menu-section .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                @media (min-width: 576px) {
                    .food-menu-section .container {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .food-menu-section .container {
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                }
                @media (min-width: 992px) {
                    .food-menu-section .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                /* Mobile-optimized animations - reduce transform values */
                @media (max-width: 767px) {
                    .food-menu-section .product-item.slide-from-left {
                        transform: translateX(-50px) rotateY(-15deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-right {
                        transform: translateX(50px) rotateY(15deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-bottom-left {
                        transform: translate(-40px, 40px) rotateZ(-10deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-top-left {
                        transform: translate(-40px, -40px) rotateZ(10deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-bottom-right {
                        transform: translate(40px, 40px) rotateZ(10deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-top-right {
                        transform: translate(40px, -40px) rotateZ(-10deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-bottom {
                        transform: translateY(50px) rotateX(-10deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-top {
                        transform: translateY(-50px) rotateX(10deg) scale(0.9);
                    }
                    .food-menu-section .product-item.slide-from-center-left {
                        transform: translateX(-60px) rotateY(-15deg) scale(0.85);
                    }
                    .food-menu-section .product-item.slide-from-center-right {
                        transform: translateX(60px) rotateY(15deg) scale(0.85);
                    }
                }
            `}} />
<section className="food-menu-section fix section-padding" style={{backgroundColor: '#fff'}}>

        <div className="food-menu-wrapper style1">
            <div className="container">
                <div className="food-menu-tab-wrapper style-bg border border-gray-200 rounded-lg">
                    <div className="title-area">
                   
                        <h2 ref={titleRef} className={`title wow fadeInUp ${isTitleVisible ? 'title-slide-up' : ''}`} style={{ color: '#0D5189' }} data-wow-delay="0.7s">
                            Omega Foods Menu
                        </h2>
                    </div>

                    <div className="food-menu-tab">
                        <ul ref={navRef} className="nav nav-pills" id="pills-tab" role="tablist">
                                {categories.map((category, index) => (
                                    <li
                                        key={category.id}
                                        className={`nav-item ${isActive === category.id ? 'active' : ''} ${isNavVisible ? 'nav-item-slide-up' : ''}`}
                                        onClick={() => setIsActive(category.id)}
                                        role="presentation"
                                        style={{ transitionDelay: `${index * 0.1}s` }}
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
                                            <Image 
                                                src={category.icon} 
                                                alt={category.name} 
                                                width={isActive === category.id ? 70 : 60} 
                                                height={isActive === category.id ? 70 : 60}
                                                className={`food-menu-tab-icon ${isActive === category.id ? 'food-menu-tab-icon-active' : ''}`}
                                            />
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
                                            <div className={`row ${isFirstCategory ? 'gx-60' : 'gx-30'} g-2 g-md-3 g-lg-4`}>
                                    <div className="col-12 col-lg-6">
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
                                    <div className="col-12 col-lg-6">
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