"use client"
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import ShopCard from "../Card/ShopCard";
import Image from "next/image";
import { categories, getAllProducts } from "../../../data/products";

const Shop1 = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [animationKey, setAnimationKey] = useState(0);
    const shopRef = useRef(null);
    const lastScrollY = useRef(0);
    const productsPerPage = 12;

    const allProducts = getAllProducts();
    // Get recent products (last 4 products)
    const recentProducts = allProducts.slice(-4);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(product => product.categoryId === selectedCategory);
        }

        // Filter by price range
        filtered = filtered.filter(product => {
            const price = parseFloat(product?.price?.replace("$", ""));
            return price >= minPrice && price <= maxPrice;
        });

        // Sort products
        if (sortBy === "price") {
            filtered.sort((a, b) => {
                const priceA = parseFloat(a.price.replace("$", ""));
                const priceB = parseFloat(b.price.replace("$", ""));
                return priceA - priceB;
            });
        } else if (sortBy === "price-desc") {
            filtered.sort((a, b) => {
                const priceA = parseFloat(a.price.replace("$", ""));
                const priceB = parseFloat(b.price.replace("$", ""));
                return priceB - priceA;
            });
        } else if (sortBy === "popularity") {
            // For now, just keep original order (you can add popularity logic later)
        } else if (sortBy === "rating") {
            // For now, just keep original order (you can add rating logic later)
        } else if (sortBy === "date") {
            // For now, just keep original order (you can add date logic later)
        }

        return filtered;
    }, [searchQuery, selectedCategory, sortBy, minPrice, maxPrice]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Split products into rows of 4
    const productRows = [];
    for (let i = 0; i < currentProducts.length; i += 4) {
        productRows.push(currentProducts.slice(i, i + 4));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page on new search
        // Trigger animation reset
        setIsVisible(false);
        setAnimationKey(prev => prev + 1);
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(selectedCategory === categoryId ? "" : categoryId);
        setCurrentPage(1);
        // Trigger animation reset when category changes
        setIsVisible(false);
        setAnimationKey(prev => prev + 1);
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    };

    const handlePriceFilter = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        // Trigger animation reset
        setIsVisible(false);
        setAnimationKey(prev => prev + 1);
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
        // Trigger animation reset
        setIsVisible(false);
        setAnimationKey(prev => prev + 1);
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Reset animations when page changes
        setIsVisible(false);
        setAnimationKey(prev => prev + 1);
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: 0.05,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentRef = shopRef.current;
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

    // Reset animations when category, search, sort, or page changes
    useEffect(() => {
        setIsVisible(false);
        setAnimationKey(prev => prev + 1);
        setTimeout(() => {
            setIsVisible(true);
        }, 150);
    }, [selectedCategory, searchQuery, sortBy, currentPage]);

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .shop-section .shop-product-item {
                    opacity: 0;
                    transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.8s ease-out;
                    will-change: transform, opacity, filter;
                }
                @keyframes showShopProduct {
                    to {
                        opacity: 1;
                        transform: translate(0, 0) rotateY(0deg) rotateZ(0deg) rotateX(0deg) scale(1);
                        filter: blur(0px);
                    }
                }
                .shop-section .shop-product-item:not(.animate) {
                    animation: showShopProduct 0.5s ease-out 1.5s forwards;
                }
                /* Different animation angles for products */
                .shop-section .shop-product-item.slide-from-left {
                    transform: translateX(-100px) rotateY(-25deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-left.animate {
                    opacity: 1;
                    transform: translateX(0) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-right {
                    transform: translateX(100px) rotateY(25deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-right.animate {
                    opacity: 1;
                    transform: translateX(0) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-bottom-left {
                    transform: translate(-80px, 80px) rotateZ(-20deg) rotateY(-10deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-bottom-left.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-bottom-right {
                    transform: translate(80px, 80px) rotateZ(20deg) rotateY(10deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-bottom-right.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-top-left {
                    transform: translate(-80px, -80px) rotateZ(20deg) rotateY(-10deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-top-left.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-top-right {
                    transform: translate(80px, -80px) rotateZ(-20deg) rotateY(10deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-top-right.animate {
                    opacity: 1;
                    transform: translate(0, 0) rotateZ(0deg) rotateY(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-bottom {
                    transform: translateY(100px) rotateX(-20deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-bottom.animate {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-top {
                    transform: translateY(-100px) rotateX(20deg) scale(0.8);
                    filter: blur(4px);
                }
                .shop-section .shop-product-item.slide-from-top.animate {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg) scale(1);
                    filter: blur(0px);
                }
                .shop-section .shop-product-item.slide-from-center {
                    transform: scale(0.5) rotateZ(180deg);
                    filter: blur(6px);
                }
                .shop-section .shop-product-item.slide-from-center.animate {
                    opacity: 1;
                    transform: scale(1) rotateZ(0deg);
                    filter: blur(0px);
                }
                /* Grid Layout Fixes */
                .shop-section .dishes-card-wrap.style2 {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                }
                @media (max-width: 1199px) {
                    .shop-section .dishes-card-wrap.style2 {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media (max-width: 991px) {
                    .shop-section .dishes-card-wrap.style2 {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                    }
                }
                @media (max-width: 575px) {
                    .shop-section .dishes-card-wrap.style2 {
                        grid-template-columns: repeat(1, 1fr);
                        gap: 12px;
                    }
                }
                .shop-section .shop-product-item {
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: stretch;
                }
                .shop-section .single-food-items {
                    background-color: #fff;
                    border-radius: 12px;
                   overflow: visible;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
                    transition: box-shadow 0.3s ease, transform 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                }
                @media (max-width: 767px) {
                    .shop-section .single-food-items {
                        overflow: visible;
                    }
                }
                .shop-section .single-food-items:hover {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
                    transform: translateY(-4px);
                }
                .shop-section .item-thumb {
                    width: 100%;
                    aspect-ratio: 1;
                    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                     overflow: visible;
                }
                @media (max-width: 767px) {
                    .shop-section .item-thumb {
                        aspect-ratio: auto !important;
                        padding: 30px 15px 20px 15px !important;
                        overflow: visible !important;
                        min-height: 250px;
                        height: auto;
                        display: flex;
                        align-items: flex-start;
                        justify-content: center;
                    }
                    .shop-section .item-thumb img,
                    .shop-section .item-thumb .food-item-img {
                        object-fit: contain !important;
                        object-position: center center !important;
                        width: 100% !important;
                        height: auto !important;
                        max-height: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        position: relative;
                    }
                }
                .shop-section.vegetable-category .item-thumb {
                    aspect-ratio: 1/2;
                }
                .shop-section .item-thumb img,
                .shop-section .item-thumb .food-item-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    display: block;
                }
                .shop-section .item-content {
                    padding: 15px 12px;
                    text-align: center;
                    background-color: #fff;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                @media (max-width: 575px) {
                    .shop-section .item-content {
                        padding: 12px 10px;
                    }
                }
                .shop-section .item-content h3 {
                    color: #0D5189 !important;
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 5px;
                    line-height: 1.3;
                }
                @media (min-width: 576px) {
                    .shop-section .item-content h3 {
                        font-size: 18px;
                    }
                }
                .shop-section .item-content .text {
                    color: #0D5189 !important;
                    font-size: 13px;
                    font-weight: 400;
                    margin-bottom: 0;
                    line-height: 1.4;
                }
                @media (min-width: 576px) {
                    .shop-section .item-content .text {
                        font-size: 15px;
                    }
                }
                .shop-section .item-content h6 {
                    display: none;
                }
            `}} />
            <div className={`shop-section section-padding fix ${selectedCategory === "Vegitables" ? "vegetable-category" : ""}`}>
                <div className="shop-wrapper style1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 order-2 order-md-1 wow fadeInUp" data-wow-delay=".3s">
                                <div className="main-sidebar">
                                    <div className="single-sidebar-widgets-wrapper">
                                        <h5 className="widget-title">Search</h5>
                                        <div className="search-widget">
                                            <form onSubmit={handleSearch}>
                                                <input
                                                    type="text"
                                                    placeholder="Search here"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                <button type="submit"><i className="bi bi-search"></i></button>
                                            </form>
                                        </div>
                                    </div>

                                    {/* <div className="single-sidebar-widget">
                                    <h5 className="widget-title">Filter By Price</h5>
                                    <div className="range__barcustom">
                                        <div className="slider">
                                            <div className="progress"></div>
                                        </div>
                                        <div className="range-input">
                                            <input
                                                type="range"
                                                className="range-min"
                                                min="0"
                                                max="100"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                            />
                                            <input
                                                type="range"
                                                className="range-max"
                                                min="0"
                                                max="100"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="range-items">
                                            <div className="price-input">
                                                <div className="price-wrapper d-flex align-items-center gap-1">
                                                    <div className="field">
                                                        <span>Price:</span>
                                                    </div>
                                                    <div className="field">
                                                        <span>$</span>
                                                        <input
                                                            type="number"
                                                            className="input-min"
                                                            value={minPrice}
                                                            onChange={(e) => setMinPrice(Number(e.target.value))}
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>
                                                    <div className="separators">-</div>
                                                    <div className="field">
                                                        <span>$</span>
                                            <input
                                                type="number"
                                                className="input-max"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                                min="0"
                                                max="100"
                                            />
                                                    </div>
                                                    <a href="#" className="filter-btn mt-2 me-3" onClick={handlePriceFilter}>Filter</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="single-sidebar-widget">
                                        <h5 className="widget-title">Recent Products</h5>
                                        {recentProducts.map((product, index) => (
                                            <div key={index} className="recent-box">
                                                <div className="recent-thumb">
                                                    <Link href={`/shop/shop-details?id=${product.id}`}>
                                                        <Image src={product.img} alt={product.title} width={78} height={78} style={{ cursor: 'pointer' }} />
                                                    </Link>
                                                </div>
                                                <div className="recent-content">
                                                    <Link href={`/shop/shop-details?id=${product.id}`}>{product.title}</Link>
                                                    <div className="star">
                                                        <Image src="/assets/img/icon/star3.svg" alt="img" width={86} height={16} />
                                                    </div>
                                                    {/* <div className="price">
                                                        <div className="offer-price">{product.price}</div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8 order-1 order-md-2 wow fadeInUp" data-wow-delay=".5s">
                                <div className="sort-bar">
                                    <div className="row g-sm-0 gy-20 justify-content-between align-items-center">


                                        <div className="single-sidebar-widget">
                                            <ul className="tagcloud" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                                                {categories.map((category) => {
                                                    const isActive = selectedCategory === category.id;
                                                    return (
                                                        <li key={category.id} style={{ listStyle: 'none' }}>
                                                            <a
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleCategoryClick(category.id);
                                                                }}
                                                                className={isActive ? "active" : ""}
                                                                style={{
                                                                    color: '#1e3a8a',
                                                                    backgroundColor: isActive ? '#f5f5f0' : 'transparent',
                                                                    padding: '8px 16px',
                                                                    borderRadius: '4px',
                                                                    textDecoration: 'none',
                                                                    display: 'inline-block',
                                                                    transition: 'all 0.3s ease',
                                                                    border: '1px solid #1e3a8a',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    if (!isActive) {
                                                                        e.currentTarget.style.backgroundColor = '#f5f5f0';
                                                                    }
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    if (!isActive) {
                                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                                    }
                                                                }}
                                                            >
                                                                {category.name}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>



                                        <div className="col-md">
                                            <p className="woocommerce-result-count">
                                                Showing {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} Results
                                            </p>
                                        </div>
                                        <div className="col-md-auto">
                                            <form className="woocommerce-ordering" method="get">
                                                <select
                                                    name="orderby"
                                                    className="single-select"
                                                    aria-label="Shop order"
                                                    value={sortBy}
                                                    onChange={handleSortChange}
                                                >
                                                    <option value="default">Default Sorting</option>
                                                    <option value="popularity">Sort by popularity</option>
                                                    <option value="rating">Sort by average rating</option>
                                                    <option value="date">Sort by latest</option>
                                                    <option value="price">Sort by price: low to high</option>
                                                    <option value="price-desc">Sort by price: high to low</option>
                                                </select>
                                            </form>
                                        </div>
                                        <div className="col-md-auto">
                                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link active"
                                                        id="pills-grid-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#pills-grid"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="pills-grid"
                                                        aria-selected="true"
                                                    >
                                                        <i className="fa-solid fa-grid"></i>
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link"
                                                        id="pills-list-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#pills-list"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="pills-list"
                                                        aria-selected="false"
                                                    >
                                                        <i className="fa-solid fa-list"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div ref={shopRef} className="tab-content" id="pills-tabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-grid"
                                        role="tabpanel"
                                        aria-labelledby="pills-grid-tab"
                                        tabIndex="0"
                                    >
                                        {productRows.length > 0 ? (
                                            productRows.map((row, rowIndex) => (
                                                <div
                                                    key={`${animationKey}-${rowIndex}`}
                                                    className="dishes-card-wrap style2 mb-3"
                                                >
                                                    {row.map((product, productIndex) => {
                                                        const totalIndex = rowIndex * 4 + productIndex;
                                                        const shouldAnimate = isVisible;

                                                        return (
                                                            <div
                                                                key={`${animationKey}-${rowIndex}-${productIndex}`}
                                                                className={`shop-product-item slide-from-bottom ${shouldAnimate ? 'animate' : ''
                                                                    }`}
                                                                style={{ transitionDelay: `${0.1 + totalIndex * 0.08}s` }}
                                                            >
                                                                <ShopCard
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
                                            ))
                                        ) : (
                                            <div className="text-center py-5">
                                                <p>No products found matching your criteria.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {totalPages > 1 && (
                                    <div className="page-nav-wrap text-center">
                                        <ul>
                                            <li>
                                                <a
                                                    className={`previous ${currentPage === 1 ? "disabled" : ""}`}
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (currentPage > 1) handlePageChange(currentPage - 1);
                                                    }}
                                                >
                                                    <i className="bi bi-arrow-left"></i>
                                                </a>
                                            </li>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <li key={page}>
                                                            <a
                                                                className={`page-numbers ${currentPage === page ? "active" : ""}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handlePageChange(page);
                                                                }}
                                                            >
                                                                {page}
                                                            </a>
                                                        </li>
                                                    );
                                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                    return (
                                                        <li key={page}>
                                                            <span className="page-numbers">...</span>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <li>
                                                <a
                                                    className={`next ${currentPage === totalPages ? "disabled" : ""}`}
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                                    }}
                                                >
                                                    <i className="bi bi-arrow-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop1;
