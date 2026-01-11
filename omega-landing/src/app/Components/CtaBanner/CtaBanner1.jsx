import Image from "next/image";
import Link from "next/link";

const CtaBanner1 = () => {
    return (
        <section className="cta-section fix">
        <div className="cta-wrapper style1  section-padding">
            {/* <div className="shape1 float-bob-x d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape1_1.png" alt="img" width={132} height={126}   />
            </div>
            <div className="shape2 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape1_2.png" alt="img" width={115} height={137}   />
            </div>
            <div className="shape3 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/ctaShape1_3.png" alt="img" width={207} height={149}   />
            </div> */}
            <div className="container">
                <div className="cta-wrap style1">
                    <div className="row">
                        <div className="col-xl-6 order-2 order-xl-1">
                            <div className="cta-content">
                                <h6 className="wow fadeInUp" data-wow-delay="0.5s">WELCOME OMEGA FRESH Food</h6>
                                <h3 className="wow fadeInUp" data-wow-delay="0.7s">TODAY SPECIAL OFFER</h3>
                                <p className="wow fadeInUp" data-wow-delay="0.8s">limited Time Offer</p>
                           </div>
                        </div>
                        <div className="col-xl-6 order-1 order-xl-2">
                            {/* <div className="cta-thumb"> */}
                            {/* <Image className="img-fluid float-bob-x" src="/assets/img/cta/ctaThumb1_1.png" alt="img" width={656} height={326}   /> */}
                            {/* </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    );
};

export default CtaBanner1;