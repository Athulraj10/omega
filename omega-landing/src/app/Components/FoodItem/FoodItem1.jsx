"use client"
import { useState } from "react";
import FoodItemCard from "../Card/FoodItemCard";
import Image from "next/image";

const FoodItem1 = () => {
    // Categories with icons and labels
    const categories = [
        {
            id: 'Frozen fish',
            name: 'Frozen fish',
            icon: '/assets/img/menu/menuIcon1_1.png',
            tabId: 'pills-Frozen fish',
            ariaControls: 'pills-Frozen fish'
        },
        {
            id: 'Spices',
            name: 'Spices',
            icon: '/assets/img/menu/menuIcon1_2.png',
            tabId: 'pills-Spices',
            ariaControls: 'pills-Spices'
        },
        {
            id: 'Fruits',
            name: 'Fruits',
            icon: '/assets/img/menu/menuIcon1_3.png',
            tabId: 'pills-Fruits',
            ariaControls: 'pills-Fruits'
        },
        {
            id: 'Vegitables',
            name: 'Vegetables',
            icon: '/assets/img/menu/menuIcon1_4.png',
            tabId: 'pills-Vegitables',
            ariaControls: 'pills-Vegitables'
        }
    ];

    // Products organized by category
    const productsByCategory = {
        'Frozen fish': [
            { img: "/assets/img/menu/Frozen/frozen1.png", title: "Frozen Shrimps U-15", content: "Origin : oman", },
            { img: "/assets/img/menu/Frozen/frozen2.png", title: "Frozen Black Pomfret", content: "Origin: UAE", },
            { img: "/assets/img/menu/Frozen/frozen3.png", title: "Chicken Pizza", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/Frozen/frozen4.png", title: "Chicken Noodles", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/Frozen/frozen5.png", title: "Grilled Chicken", content: "It's a testament to our.", },
            { img: "/assets/img/menu/Frozen/frozen6.png", title: "Egg and Cucumber", content: "It's a testament to our.", },
            { img: "/assets/img/menu/Frozen/frozen7.png", title: "Chicken White Rice", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/Frozen/frozen8.png", title: "Spatial Barger", content: "It's a testament to our.", },
            { img: "/assets/img/menu/Frozen/frozen9.png", title: "Vegetables Burger", content: "It's a testament to our.", },
            // { img: "/assets/img/menu/Frozen/frozen10.png", title: "Brief Chicken", content: "It's a testament to our.", }
        ],
        "Spices": [
            { img: "/assets/img/menu/menuThumb1_3.png", title: "Chicken Pizza", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_4.png", title: "Chicken Noodles", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_5.png", title: "Grilled Chicken", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_1.png", title: "Chinese Pasta", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_2.png", title: "Chicken Fried Rice", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_6.png", title: "Egg and Cucumber", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_8.png", title: "Spatial Barger", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_9.png", title: "Vegetables Burger", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_7.png", title: "Chicken White Rice", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_10.png", title: "Brief Chicken", content: "It's a testament to our.", }
        ],
        "Fruits": [
            { img: "/assets/img/menu/menuThumb1_1.png", title: "Chinese Pasta", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_5.png", title: "Grilled Chicken", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_2.png", title: "Chicken Fried Rice", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_3.png", title: "Chicken Pizza", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_4.png", title: "Chicken Noodles", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_9.png", title: "Vegetables Burger", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_10.png", title: "Brief Chicken", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_6.png", title: "Egg and Cucumber", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_7.png", title: "Chicken White Rice", content: "It's a testament to our.", },
            { img: "/assets/img/menu/menuThumb1_8.png", title: "Spatial Barger", content: "It's a testament to our.",  }
        ],
        "Vegitables": [
            { img: "/assets/img/menu/menuThumb1_2.png", title: "Chicken Fried Rice", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_1.png", title: "Chinese Pasta", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_3.png", title: "Chicken Pizza", content: "It's a testament to our.",},
            { img: "/assets/img/menu/menuThumb1_4.png", title: "Chicken Noodles", content: "It's a testament to our.",},
            { img: "/assets/img/menu/menuThumb1_5.png", title: "Grilled Chicken", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_6.png", title: "Egg and Cucumber", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_9.png", title: "Vegetables Burger", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_7.png", title: "Chicken White Rice", content: "It's a testament to our.",},
            { img: "/assets/img/menu/menuThumb1_8.png", title: "Spatial Barger", content: "It's a testament to our.",  },
            { img: "/assets/img/menu/menuThumb1_10.png", title: "Brief Chicken", content: "It's a testament to our.",  }
        ]
    };

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
                        <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20} />
                            FOOD MENU<Image className="ms-1"
                                    src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20} />
                        </div>
                        <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                            Fresheat Foods Menu
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
                                            <Image src={category.icon} alt={category.name} width={36} height={36} />
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
                                                            key={index}
                                                            img={product.img}
                                                            title={product.title}
                                                            content={product.content}
                                                            price={product.price}
                                                        />
                                                    ))}
                                    </div>
                                    <div className="col-lg-6">
                                                    {right.map((product, index) => (
                                    <FoodItemCard
                                                            key={index}
                                                            img={product.img}
                                                            title={product.title}
                                                            content={product.content}
                                                            price={product.price}
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
        <div className="marquee-wrapper style-1 text-slider section-padding pt-0 mt-5">
            <div className="marquee-inner to-left">
                <ul className="marqee-list d-flex">
                    <li className="marquee-item style1">
                        <span className="text-slider"></span><span className="text-slider text-style">chicken pizza</span>
                        <span className="text-slider"></span><span className="text-slider text-style">GRILLED CHICKEN</span>
                        <span className="text-slider"></span><span className="text-slider text-style">BURGER</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN PIZZA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">FRESH PASTA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">ITALIANO FRENCH FRY</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN FRY</span>
                        <span className="text-slider"></span><span className="text-slider text-style">chicken pizza</span>
                        <span className="text-slider"></span><span className="text-slider text-style">GRILLED CHICKEN</span>
                        <span className="text-slider"></span><span className="text-slider text-style">BURGER</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN PIZZA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">FRESH PASTA</span>
                        <span className="text-slider"></span><span className="text-slider text-style">ITALIANO FRENCH FRY</span>
                        <span className="text-slider"></span><span className="text-slider text-style">CHICKEN FRY</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    );
};

export default FoodItem1;