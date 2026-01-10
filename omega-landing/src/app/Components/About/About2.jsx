"use client"
import { useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import Image from "next/image";

const About2 = () => {

        const [iframeSrc, setIframeSrc] = useState('about:blank');
        const [toggle, setToggle] = useState(false);
      
        const handelClick = () => {
          setIframeSrc("https://www.youtube.com/embed/rRid6GCJtgc");
          setToggle(!toggle);
        };
        const handelClose = () => {
          setIframeSrc('about:blank');
          setToggle(!toggle);
        };

    return (
<section className="about-us-section fix section-padding pt-0">
        <div className="about-wrapper style2">
            <div className="shape1 d-none d-xxl-block"><Image src="/assets/img/shape/aboutShape2_1.png" alt="img" width={225} height={401}   /></div>
            <div className="container">
                <div className="about-us section-padding">
                    <div className="row d-flex align-items-center">
                        <div className="col-lg-6 d-flex align-items-center justify-content-center justify-content-xl-start">
                            <div className="about-thumb mb-5 mb-lg-0">
                            <Image src="/assets/img/about/aboutThumb2_1.png" alt="img" width={875} height={536}   />
                                
                                <div className="video-wrap">
                                    <a onClick={handelClick} 
                                        className="play-btn popup-video"><Image className="cir36" src="/assets/img/shape/player.svg" alt="img" width={152} height={152}   /></a>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="title-area">
                                <div className="sub-title text-start wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                    About US<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                </div>
                                <h2 className="title text-start wow fadeInUp" data-wow-delay="0.7s">
                                    Variety of flavours from american cuisine
                                </h2>
                                <div className="text text-start wow fadeInUp" data-wow-delay="0.8s">Every dish is not just
                                    prepared it is a crafted with a savor the a utmost precision and a deep understanding
                                    sdf of flavor harmony. The experienced hands of our chefs</div>
                            </div>
                            <div className="fancy-box-wrapper">
                                <div className="fancy-box">
                                    <div className="item"><Image src="/assets/img/icon/aboutIcon1_1.svg" alt="img" width={36} height={36}   /></div>
                                    <div className="item">
                                        <h6>super quality food</h6>
                                        <p>Served our Testy Food & good food by friendly</p>
                                    </div>
                                </div>
                                <div className="fancy-box">
                                    <div className="item"><Image src="/assets/img/icon/aboutIcon1_2.svg" alt="img" width={36} height={36}   /></div>
                                    <div className="item">
                                        <h6>Qualified Chef</h6>
                                        <p>Served our Testy Food & good food by friendly</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="marquee-wrapper style-1 text-slider section-padding pt-0">
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
        <VideoModal
            isTrue={toggle}
            iframeSrc={iframeSrc}
            handelClose={handelClose}        
        ></VideoModal> 

    </section>
    );
};

export default About2;