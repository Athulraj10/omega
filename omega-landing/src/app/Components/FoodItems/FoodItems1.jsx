"use client"
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { foodItems1Products } from "@/data/products";

const FoodItems1 = () => {

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
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      }; 

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .best-food-items-section .title-area .title {
                    color: #0D5189 !important;
                }
                .best-food-items-section .single-food-items .item-content h3 {
                    color: #0D5189 !important;
                }
                .best-food-items-section .single-food-items .item-content .text {
                    color: #0D5189 !important;
                }
                .best-food-items-section .single-food-items .item-content h6 {
                    color: #0D5189 !important;
                }
            `}} />
        <section className="best-food-items-section fix p-5" style={{ backgroundColor: '#fff' }}>
        <div className="best-food-wrapper">
            {/* <div className="shape1 float-bob-y d-none d-xxl-block"><img src="/assets/img/shape/bestFoodItemsShape1_1.png"
                    alt="shape"  height={200} width={200}  /></div>
            <div className="shape2  float-bob-x d-none d-xxl-block"><img height={200} width={200}  src="/assets/img/shape/bestFoodItemsShape1_2.png"
                    alt="shape" /></div> */}
            <div className="container">
                <div className="title-area">
                    <h2 className="title wow fadeInUp text-center" data-wow-delay="0.7s" style={{ color: '#0D5189' }}>
                        Popular Fresh Fish
                    </h2>
                </div>
                <div className="slider-area mb-n40">
                    <div className="swiper bestFoodItems-slider">
                        <div className="swiper-wrapper cs_slider_gap_301 food-slider-item">
                        <Slider {...settings}>
                        {foodItems1Products.map((item) => (
                            <div key={item.id} className="swiper-slide shadow rounded-3 mb-5 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
                                <div className="single-food-items transition-all duration-300" style={{ backgroundColor: '#fff' }}>
                                    <div className="item-thumb overflow-hidden">
                                        <Image src={item.img} width={158} height={158} alt="thumb" className="food-item-img transition-transform duration-300 hover:scale-110" />
                                        <div className="circle-shape">
                                            <Image className="cir36" src="/assets/img/food-items/circleShape.png" width={174} height={174} alt="shape" />
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <Link href="/menu">
                                            <h3 className="transition-colors duration-300 hover:text-orange-500" style={{ color: '#0D5189' }}>{item.title}</h3>
                                        </Link>
                                        <div className="text" style={{ color: '#0D5189' }}>{item.content}</div>
                                        <h6 className="transition-colors duration-300 hover:text-orange-600" style={{ color: '#0D5189' }}>{item.price}</h6>
                                    </div>
                                </div>
                            </div>
                            ))}
                            </Slider>
                           
                        </div>
                    </div>

                    <div className="bestFoodItems-pagination"></div>
                </div>
            </div>
        </div>
    </section>
    </>
    );
};

export default FoodItems1;