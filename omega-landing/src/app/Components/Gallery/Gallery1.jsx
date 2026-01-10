"use client"
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const Gallery1 = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 6,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 6,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
      }; 
    
    const logoItems = [
        {img:'/assets/img/gallery/galleryThumb1_5.jpg'},
        {img:'/assets/img/gallery/galleryThumb1_1.jpg'},
        {img:'/assets/img/gallery/galleryThumb1_2.jpg'},
        {img:'/assets/img/gallery/galleryThumb1_3.jpg'},
        {img:'/assets/img/gallery/galleryThumb1_4.jpg'},
        {img:'/assets/img/gallery/galleryThumb1_5.jpg'},
        {img:'/assets/img/gallery/galleryThumb1_1.jpg'},
        {img:'/assets/img/gallery/galleryThumb1_2.jpg'},        
      ]; 

    return (
        <div className="gallery-section">
        <div className="gallery-wrapper style1">
            <div className="container1">
                <div className="slider-area">
                    <div className="swiper gallerySliderOne">
                        <div className="swiper-wrapper cs_slider_gap_301 gallery-slider-area">
                        <Slider {...settings}>
                        {logoItems.map((item, i) => (
                            <div key={i} className="swiper-slide">
                                <div className="gallery-thumb">
                                    <Link href="/menu">
                                    <Image src={item.img} alt="img" width={295} height={292}   />
                                        <div className="icon"><Image src="/assets/img/icon/camera.svg" alt="img" width={32} height={33}   /></div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        </Slider>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Gallery1;