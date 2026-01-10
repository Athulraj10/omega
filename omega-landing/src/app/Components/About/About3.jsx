import Image from "next/image";
import Link from "next/link";

const About3 = () => {
    return (
        <div className="about-section fix">
        <div className="about-wrapper section-padding  style3">
            <div className="shape1"><Image className="float-bob-y" src="/assets/img/shape/aboutShape3_1.png" alt="img" width={232} height={194}   /></div>
            <div className="shape2"><Image className="float-bob-x" src="/assets/img/shape/aboutShape3_2.png" alt="img" width={125} height={104}   /></div>
            <div className="orange-shape"><Image src="/assets/img/about/orange-shape.png" alt="img" width={125} height={256}   /></div>
            <div className="container">
                <div className="row gx-60 gy-5">
                    <div className="col-xl-6">
                        <div className="about-thumb-img">
                        <Image src="/assets/img/about/aboutThumb1_1.png" alt="img" width={618} height={586}   />
                            
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-content">
                            <div className="title-area">
                                <div className="sub-title text-start wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                     About Us <Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                </div>
                                <h2 className="title text-start wow fadeInUp" data-wow-delay="0.7s">
                                    We Ensure Healthy & High-Quality Foods
                                </h2>
                                <div className="text text-start wow fadeInUp" data-wow-delay="0.8s">It is a long established
                                    fact that a reader will be distracted lorem the readable content of a page when
                                    looking at layout the point lorem established fact that It is a long established
                                </div>
                            </div>
                            <div className="fancy-box-wrapper">
                                <div className="fancy-box">
                                    <div className="item"><Image src="/assets/img/icon/aboutIcon2_1.svg" alt="img" width={66} height={66}   /></div>
                                    <div className="item">
                                        <h6>super quality food</h6>
                                        <p>Served our Testy Food &amp; good food by friendly</p>
                                    </div>
                                </div>
                                <div className="fancy-box">
                                    <div className="item"><Image src="/assets/img/icon/aboutIcon2_2.svg" alt="img" width={66} height={66}   /></div>
                                    <div className="item">
                                        <h6>Qualified Chef</h6>
                                        <p>Served our Testy Food &amp; good food by friendly</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/about2" className="theme-btn style4">
                                ABOUT US <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default About3;