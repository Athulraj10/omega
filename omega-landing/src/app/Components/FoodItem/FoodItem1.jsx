"use client"
import { useState } from "react";
import FoodItemCard from "../Card/FoodItemCard";
import Image from "next/image";
import { categories, productsByCategory } from "../../../data/products";

const FoodItem1 = () => {

    const [isActive, setIsActive] = useState('Frozen fish');

    // Helper function to split products into two columns
    const splitProducts = (products) => {
        const mid = Math.ceil(products.length / 2);
        return {
            left: products.slice(0, mid),
            right: products.slice(mid)
        };
    };

    return (
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
                   
                        <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                            Omega Foods Foods Menu
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
                                            {category.name}
                                        </button>
                            </li>
                                ))}
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                                {categories.map((category) => {
                                    const products = productsByCategory[category.id] || [];
                                    const { left, right } = splitProducts(products);
                                    const isFirstCategory = category.id === 'Frozen fish';
                                    
                                    return (
                                        <div
                                            key={category.id}
                                            className={`tab-pane ${isActive === category.id ? 'active' : ''}`}
                                            id={category.tabId}
                                            role="tabpanel"
                                            aria-labelledby={`${category.tabId}-tab`}
                                            tabIndex="0"
                                        >
                                            <div className={`row ${isFirstCategory ? 'gx-60' : 'gx-30'}`}>
                                    <div className="col-lg-6">
                                                    {left.map((product, index) => (
                                    <FoodItemCard
                                                            key={product.id || index}
                                                            img={product.img}
                                                            title={product.title}
                                                            content={product.content}
                                                            price={product.price}
                                                            productId={product.id}
                                                        />
                                                    ))}
                                    </div>
                                    <div className="col-lg-6">
                                                    {right.map((product, index) => (
                                    <FoodItemCard
                                                            key={product.id || index}
                                                            img={product.img}
                                                            title={product.title}
                                                            content={product.content}
                                                            price={product.price}
                                                            productId={product.id}
                                                        />
                                                    ))}
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
    );
};

export default FoodItem1;