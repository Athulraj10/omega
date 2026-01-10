"use client"
import { useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import Image from "next/image";

const Contact1 = () => {

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
<section className="contact-section fix bg-color3">
        <div className="contact-shape">
        <Image src="/assets/img/shape/cta-shape.png" alt="img" width={225} height={401}   />
        </div>
        <div className="contact-wrapper style1 section-padding ">
            <div className="shape"><Image src="/assets/img/contact/contactThumb1_1.png" alt="img" width={929} height={811}   /></div>
            <div className="shape2"><Image src="/assets/img/contact/contactThumb1_2.jpg" alt="img" width={1447} height={811}   /></div>
            <div className="container"> 
                <div className="row g-5 d-flex justify-content-center">
                    <div
                        className="col-xl-5 d-flex align-items-center justify-content-center justify-content-md-start z-3 order-2 order-xl-1">
                        <div className="contact-card-wrap">
                            <div className="title-area">
                                <div className="sub-title text-white text-start wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIconWhite.svg" alt="img" width={20} height={20}   />
                                    CONTACT US<Image className="ms-1" src="/assets/img/icon/titleIconWhite.svg" alt="img" width={20} height={20}   />
                                </div>
                                <h2 className="title text-start text-white wow fadeInUp" data-wow-delay="0.7s">
                                    Meet Our Expert Chefe
                                </h2>
                            </div>

                            <div className="contact-form style1">
                                <form className="row g-3">
                                    <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                                        <label htmlFor="date" className="form-label">Select Date*</label>
                                        <input type="date" className="form-control" id="date" required />
                                    </div>
                                    <div className="col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                                        <label htmlFor="time" className="form-label">Select Time*</label>
                                        <input type="time" className="form-control" id="time" required />
                                    </div>
                                    <div className="col-md-12 wow fadeInUp" data-wow-delay="0.6s">
                                        <label htmlFor="service" className="form-label">Type Of Service*</label>
                                        <input className="form-control" id="service" placeholder="Total Guests" required />
                                    </div>
                                    <div className="col-md-12 wow fadeInUp" data-wow-delay="0.8s">
                                        <label htmlFor="message" className="form-label">Your Message</label>
                                        <textarea id="message" className="form-control"
                                            placeholder="Write your message here..." rows="5"></textarea>
                                    </div>
                                    <div className="col-12 wow fadeInUp" data-wow-delay="0.9s">
                                        <button type="submit" className="theme-btn style5">
                                            BOOK A TABLE<i className="bi bi-arrow-right"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                    <div className="col-xl-7 d-flex align-items-center justify-content-center justify-content-md-center order-1 order-xl-2 wow fadeInUp"
                        data-wow-delay="0.2s">
                        <div className="video-wrap">
                            <a onClick={handelClick} className="play-btn popup-video"><Image className="cir36" src="/assets/img/shape/player.svg" alt="img" width={152} height={152}   /></a>
                        </div>
                    </div>
                </div>
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

export default Contact1;