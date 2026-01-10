import Image from "next/image";
import Link from "next/link";

const CtaBanner2 = () => {
    return (
        <section className="cta-section fix">
        <div className="cta-wrapper  section-padding pt-xl-0 pb-xl-0 style2">
            <div className="shape1 float-bob-x d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape2_1.png" alt="img" width={101} height={79}   />
            </div>
            <div className="shape2 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape2_2.png" alt="img" width={189} height={202}   />
            </div>
            <div className="shape3 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape2_3.png" alt="img" width={212} height={279}   />
            </div>
            <div className="shape4   d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape2_4.png" alt="img" width={144} height={217}   /></div>
            <div className="shape5   d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape2_5.png" alt="img" width={122} height={92}   /></div>
            <div className="shape6   d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape2_6.png" alt="img" width={88} height={67}   /></div>
            <div className="shape7   d-none d-xxl-block"><Image className="cir36" src="/assets/img/shape/ctaShape2_7.png" alt="img" width={208} height={208}   /></div>
            <div className="container">
                <div className="cta-wrap style2">
                    <div className="row">
                        <div className="col-xl-6  d-flex align-items-center  order-2 order-xl-1">
                            <div className="cta-content">
                                <h6 className="wow fadeInUp" data-wow-delay="0.5s">WELCOME FRESHEAT</h6>
                                <h3 className="wow fadeInUp" data-wow-delay="0.7s">TODAY SPACIAL FOOD</h3>
                                <p className="wow fadeInUp" data-wow-delay="0.8s">limits Time Offer</p>
                                <Link className="theme-btn wow fadeInUp" data-wow-delay="0.9s" href="/menu">ORDER NOW <i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div
                            className="col-xl-6 d-flex align-items-center justify-content-center justify-content-xl-end order-1 order-xl-2">
                            <div className="cta-thumb">
                            <Image className="img-fluid float-bob-x" src="/assets/img/cta/ctaThumb2_1.png" alt="img" width={541} height={475}   />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    );
};

export default CtaBanner2;