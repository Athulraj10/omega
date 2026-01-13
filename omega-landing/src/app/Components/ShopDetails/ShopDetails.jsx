"use client"
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../../data/products";
import { useState, useEffect, useMemo } from "react";

const ShopDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productId) {
            const productData = getProductById(productId);
            setProduct(productData);
        }
    }, [productId]);

    // Calculate average rating from reviews
    const averageRating = useMemo(() => {
        if (!product || !product.reviews || product.reviews.length === 0) return 5.0;
        const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / product.reviews.length).toFixed(2);
    }, [product]);

    const reviews = product?.reviews || [];

    if (!product) {
        return (
            <div className="shop-details-section section-padding pb-0 fix">
                <div className="container">
                    <div className="text-center py-5">
                        <h2>Product not found</h2>
                        <Link href="/shop" className="theme-btn">Back to Shop</Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, Math.min(100, prev + delta)));
    };

    return (
        <div className="shop-details-section section-padding pb-0 fix">
            <div className="shop-details-wrapper style1">
                <div className="container">
                    <div className="shop-details bg-white">
                        <div className="container">
                            <div className="row gx-60">
                                <div className="col-lg-6">
                                    <div className="product-big-img bg-color2">
                                        <div className="dishes-thumb">
                                            <Image src={product.img} alt={product.title} width={304} height={302} />
                                            <div className="circle-shape d-none d-md-block">
                                                <Image
                                                    className="cir36"
                                                    src="/assets/img/food-items/circleShape2.png"
                                                    alt="img"
                                                    width={324}
                                                    height={324}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="product-about">
                                        <div className="title-wrapper">
                                            <h2 className="product-title">{product.title}</h2>
                                            <div className="price">{product.price}</div>
                                        </div>

                                        <div className="product-rating">
                                            <div className="star-rating" role="img" aria-label={`Rated ${averageRating} out of 5`}>
                                                <span>
                                                    Rated <strong className="rating">{averageRating}</strong> out of 5 based on{" "}
                                                    <span className="rating">{reviews.length}</span> customer {reviews.length === 1 ? 'rating' : 'ratings'}
                                                </span>
                                            </div>
                                            <a href="#reviews" className="woocommerce-review-link">
                                                (<span className="count">{reviews.length}</span> customer {reviews.length === 1 ? 'review' : 'reviews'})
                                            </a>
                                        </div>

                                        <div className="product-info mb-3">
                                            <p className="text mb-2">
                                                <strong>Origin:</strong> {product.content}
                                            </p>
                                            <p className="text mb-2">
                                                <strong>Category:</strong> {product.categoryId}
                                            </p>
                                        </div>

                                        <p className="text">{product.description || "Premium quality product with excellent taste and freshness."}</p>

                                        <div className="actions">
                                            <div className="quantity">
                                                <p>Quantity</p>
                                                <div className="qty-wrapper">
                                                    <input
                                                        type="number"
                                                        className="qty-input"
                                                        step="1"
                                                        min="1"
                                                        max="100"
                                                        name="quantity"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                                                        title="Qty"
                                                    />
                                                    <button
                                                        className="quantity-plus qty-btn"
                                                        onClick={() => handleQuantityChange(1)}
                                                        type="button"
                                                    >
                                                        <i className="bi bi-plus-lg"></i>
                                                    </button>
                                                    <button
                                                        className="quantity-minus qty-btn"
                                                        onClick={() => handleQuantityChange(-1)}
                                                        type="button"
                                                    >
                                                        <i className="bi bi-dash-lg"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <Link href="/shop/cart" className="theme-btn cart-btn0">
                                                Add to Cart <i className="bi bi-basket3-fill bg-transparent text-white"></i>
                                            </Link>
                                            <Link href="/shop/wishlist" className="theme-btn style5 border-0">
                                                ADD TO wishlist<i className="bi bi-heart-fill"></i>
                                            </Link>
                                        </div>
                                        <div className="share">
                                            <h6>share with friends</h6>
                                            <ul className="social-media">
                                                <li>
                                                    <a href="https://www.facebook.com">
                                                        <i className="bi bi-facebook"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.youtube.com">
                                                        <i className="bi bi-youtube"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.x.com">
                                                        <i className="bi bi-twitter-x"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.linkedin.com">
                                                        <i className="bi bi-linkedin"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="product-description">
                                        <h3>Product Description</h3>
                                        <div className="desc">
                                            <p>{product.description || "Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>
                                            <br />
                                            <p>
                                                When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="product-review" id="reviews">
                                        <h3>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</h3>
                                        <ul className="comment-list">
                                            {reviews.map((review) => (
                                                <li key={review.id} className="review comment-item">
                                                    <div className="post-comment">
                                                        <div className="comment-avater">
                                                            <Image
                                                                src={review.avatar}
                                                                alt={review.name}
                                                                width={96}
                                                                height={96}
                                                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                        <div className="comment-content">
                                                            <h4 className="name">{review.name}</h4>
                                                            <div className="commented-on">{review.date}</div>
                                                            <div className="star" style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '8px', marginBottom: '8px' }}>
                                                                {Array.from({ length: 5 }, (_, i) => (
                                                                    <i
                                                                        key={i}
                                                                        className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                                                                        style={{ 
                                                                            color: i < review.rating ? '#ffc107' : '#ddd',
                                                                            fontSize: '18px'
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p className="text">{review.comment}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="comment-form">
                                        <div className="form-title">
                                            <h3 className="inner-title">Add a Review</h3>
                                            <p>Your email address will not be published. Required fields are marked *</p>
                                            <div className="rating">
                                                <p>Rate this product? *</p>
                                                <ul className="star">
                                                    <li>
                                                        <i className="bi bi-star"></i>
                                                    </li>
                                                    <li>
                                                        <i className="bi bi-star"></i>
                                                    </li>
                                                    <li>
                                                        <i className="bi bi-star"></i>
                                                    </li>
                                                    <li>
                                                        <i className="bi bi-star"></i>
                                                    </li>
                                                    <li>
                                                        <i className="bi bi-star"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group style-white2">
                                                <input type="text" placeholder="Your Name" className="form-control" />
                                                <i className="bi bi-person text-title"></i>
                                            </div>
                                            <div className="col-md-6 form-group style-white2">
                                                <input type="text" placeholder="Your Email" className="form-control" />
                                                <i className="text-title bi bi-envelope"></i>
                                            </div>
                                            <div className="col-12 form-group style-white2">
                                                <textarea placeholder="Write a Message" className="form-control" rows="5"></textarea>
                                                <i className="text-title bi bi-pencil"></i>
                                            </div>

                                            <div className="col-12 form-group">
                                                <input id="reviewcheck" name="reviewcheck" type="checkbox" />
                                                <label htmlFor="reviewcheck">
                                                    Save my name, email, and website in this browser for the next time I comment.
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="col-12 form-group mb-0">
                                                <button className="theme-btn">
                                                    Post A Comment <i className="bi bi-arrow-right bg-transparent text-white"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;
