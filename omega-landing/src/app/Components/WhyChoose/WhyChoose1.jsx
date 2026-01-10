"use client"
import { useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import Link from "next/link";
import Image from "next/image";

const WhyChoose1 = () => {

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
<section className="history-section fix  bg-title">
        <div className="tree-shape">
        <Image src="/assets/img/history/tree-shape.png" alt="img" width={284} height={351}   />
        </div>
        <div className="container">
            <div className="history-wrapper style1">
                <div className="row gx-60">
                    <div className="col-lg-8">
                        <div className="history-thumb mt-5 mt-lg-0">
                        <Image className="thumb" src="/assets/img/history/historyThumb1_1.jpg" alt="img" width={1164} height={787}   />

                            <div className="video-wrap ripple-effect">
                                <a onClick={handelClick} className="play-btn popup-video"><Image className="playerImg" src="/assets/img/shape/player2.svg" alt="img" width={28} height={26}   /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="history-content section-padding">
                            <div className="title-area mb-45">
                                <div className="sub-title text-start wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                     Why choose us <Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                </div>
                                <div className="title text-start text-white wow fadeInUp" data-wow-delay="0.7s">
                                    The history of our restaurant
                                </div>

                                <p className="text-white">It is a long established fact that a reader will be distracted the
                                    readable content of a page</p>
                            </div>

                            <div className="fancy-box style6">
                                <div className="item">
                                    <div className="icon">
                                    <Image src="/assets/img/icon/wcuIcon2_1.png" alt="img" width={65} height={65}   />
                                    </div>

                                </div>
                                <div className="item">
                                    <h6 className="title">Buffet Service</h6>
                                    <p className="text">It is a long established fact that a reader will be distracted the
                                    </p>
                                </div>
                            </div>
                            <div className="fancy-box style6">
                                <div className="item">
                                    <div className="icon">
                                    <Image src="/assets/img/icon/wcuIcon2_2.png" alt="img" width={65} height={65}   />
                                    </div>
                                </div>
                                <div className="item">
                                    <h6 className="title">Cook & Sarve Faster</h6>
                                    <p className="text">It is a long established fact that a reader will be distracted the
                                    </p>
                                </div>
                            </div>
                            <Link href="/menu" className="theme-btn style4">
                                ORDER NOW <i className="bi bi-arrow-right"></i>
                            </Link>
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

export default WhyChoose1;