import Image from "next/image";

const Process1 = () => {
    return (
    <div className="wcu-section section-padding fix bg-white">
        <div className="wcu-wrapper style1">
            <div className="shape1 d-none d-xxl-block float-bob-y"><Image src="/assets/img/shape/wcuShape1_1.png" alt="img" width={204} height={160}   />
            </div>
            <div className="shape2 d-none d-xxl-block"><Image src="/assets/img/shape/wcuShape1_2.png" alt="img" width={162} height={221}   /></div>
            <div className="container">
                <div className="row gy-5 gx-80 d-flex align-items-center">
                    <div className="col-md-6 order-2 order-md-1">
                        <div className="wcu-content">
                            <div className="title-area">
                                <div className="sub-title text-start wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                    Work Process <Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                </div>
                                <h2 className="title text-start wow fadeInUp" data-wow-delay="0.7s">
                                    Delicious Food and Quick Delivery Together
                                </h2>
                            </div>

                            <div className="fancy-box style5">
                                <div className="item">
                                    <div className="icon">
                                    <Image src="/assets/img/icon/wcuIcon1_1.svg" alt="img" width={36} height={36}   />
                                    </div>
                                </div>
                                <div className="item">
                                    <h6>Set your Location</h6>
                                    <p>It’s the perfect dining experience where a every dish is crafted</p>
                                </div>
                            </div>
                            <div className="fancy-box style5">
                                <div className="item">
                                    <div className="icon">
                                    <Image src="/assets/img/icon/wcuIcon1_2.svg" alt="img" width={36} height={36}   />
                                    </div>
                                </div>
                                <div className="item">
                                    <h6>Select Food</h6>
                                    <p>It’s the perfect dining experience where a every dish is crafted</p>
                                </div>
                            </div>
                            <div className="fancy-box style5">
                                <div className="item">
                                    <div className="icon">
                                    <Image src="/assets/img/icon/wcuIcon1_3.svg" alt="img" width={36} height={36}   />
                                    </div>
                                </div>
                                <div className="item">
                                    <h6>Pay Cash or Online</h6>
                                    <p>It’s the perfect dining experience where a every dish is crafted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6  order-1 order-md-2">
                        <div className="wcu-thumb">
                        <Image src="/assets/img/wcu/wcuThumb1_1.png" alt="img" width={558} height={509}   />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    );
};

export default Process1;