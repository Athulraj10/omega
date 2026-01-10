import Image from "next/image";
import Link from "next/link";

const CtaBanner3 = () => {
    return (
    <section className="cta-section style-white fix">
        <div className="cta-wrapper style3">
            <div className="container">
                <div className="cta-wrap  section-padding pt-xl-0 pb-xl-0 style3">
                    <div className="shape1 float-bob-x d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape3_1.png" alt="img" width={96} height={92}   /></div>
                    <div className="shape2 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape3_2.png" alt="img" width={115} height={126}   /></div>
                    <div className="shape3 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape3_3.png" alt="img" width={309} height={246}   /></div>
                    <div className="shape4 d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape3_4.png" alt="img" width={181} height={138}   />
                    </div>
                    <div className="shape5 d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape3_5.png" alt="img" width={163} height={114}   />
                    </div>
                    <div className="shape6 d-none d-xxl-block"><Image className="cir36" src="/assets/img/shape/ctaShape3_6.png" alt="img" width={116} height={116}   /></div>
                    <div className="shape7 d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape3_7.png" alt="img" width={122} height={92}   />
                    </div>
                    <div className="row g-5">
                        <div className="col-xl-6  d-flex align-items-center justify-content-center order-2 order-xl-1">
                            <div className="cta-content">
                                <h6 className="text-white wow fadeInUp" data-wow-delay="0.5s"><Image className="me-1" src="/assets/img/icon/titleIconWhite.svg" alt="img" width={20} height={20}   />DOWNLOAD APP<Image className="ms-1" src="/assets/img/icon/titleIconWhite.svg" alt="img" width={20} height={20}   /></h6>
                                <h3 className="wow fadeInUp" data-wow-delay="0.7s">Download food app Order today!</h3>
                                <div className="btn-wrapper d-md-flex align-items-center gap-2">
                                    <div className="btns">
                                        <Link className="apple-btn wow fadeInUp" data-wow-delay="0.9s" href="https://www.apple.com/store">
                                            <div className="d-flex align-items-center   gap-2">
                                            <Image src="/assets/img/icon/appleStore.svg"  alt="img" width={26} height={32}   />
                                                
                                                <div>
                                                    <span>Get it on</span>
                                                    <h6>App store</h6>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="btns">
                                        <Link className="google-btn wow fadeInUp" data-wow-delay="0.9s" href="https://play.google.com/store/">
                                            <div className="d-flex align-items-center  gap-2">
                                            <Image src="/assets/img/icon/playStore.svg" alt="img" width={28} height={31}   />
                                                
                                                <div>
                                                    <span>Get it on</span>
                                                    <h6>Google play</h6>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-6 d-flex align-items-center justify-content-center justify-content-xl-start order-1 order-xl-2">
                            <div className="cta-thumb">
                            <Image className="img-fluid float-bob-x" src="/assets/img/cta/ctaThumb3_1.png" alt="img" width={389} height={379}   />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    );
};

export default CtaBanner3;