import Image from "next/image";
import Link from "next/link";

const Footer1 = () => {
    return (
        <footer className="footer-section fix" style={{
            backgroundImage: 'url(/assets/img/footer/footer.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
        <div className="footer-widgets-wrapper">
            <div className="shape1 float-bob-y d-none d-xxl-block"> <Image src="/assets/img/footer/mussels.png" alt="img" width={300} height={300}   /></div>
            {/* <div className="shape2 d-none d-xxl-block"><Image src="/assets/img/shape/footerShape1_2.png" alt="img" width={300} height={300}   /></div> */}
            {/* <div className="shape3 d-none d-xxl-block"><Image src="/assets/img/shape/footerShape1_3.png" alt="img" width={300} height={300}   /></div> */}
            <div className="shape4" style={{ 
                overflow: 'hidden', 
            }}>
                {/* <Image src="/assets/img/footer/fruitsImage.png" alt="img" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'contain' }}   /> */}
            </div>
            <div className="container">
                <div className="footer-top">
                    <div className="row gy-4">
                        <div className="col-lg-4">
                            <div className="fancy-box">
                                <div className="item1"><i className="bi bi-geo-alt-fill"></i></div>
                                <div className="item2">
                                    <h6>address</h6>
                                    <p>Abu Dhabi, UAE</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                            <div className="fancy-box">
                                <div className="item1"><i className="bi bi-envelope-fill"></i></div>
                                <div className="item2">
                                    <h6>send email</h6>
                                    <p>info@omegafoods.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                            <div className="fancy-box">
                                <div className="item1"><i className="bi bi-telephone-fill"></i></div>
                                <div className="item2">
                                    <h6>call </h6>
                                    <p>+971 56 888 8888</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center text-center">

                 
                    <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                        <div className="single-footer-widget">
                            <div className="widget-head">
                                <h3>Quick Links</h3>
                            </div>
                            <ul className="list-area">
                                <li>
                                    <Link href="/about">
                                    <i className="bi bi-chevron-double-right"></i>
                                        About Us
                                    </Link>
                                </li>
                         
                               
                                <li>
                                    <Link href="/faq">
                                    <i className="bi bi-chevron-double-right"></i>
                                        FAQ’S
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                    <i className="bi bi-chevron-double-right"></i>
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                        <div className="single-footer-widget">
                            <div className="widget-head">
                                <h3>Our Menu</h3>
                            </div>
                            <ul className="list-area">
                            <li>
                                <Link href="/shop">
                                    <i className="bi bi-chevron-double-right"></i>
                                        Seafood
                                    </Link>
                                </li>
                                <li>
                                <Link href="/shop">
                                    <i className="bi bi-chevron-double-right"></i>
                                        Fruits
                                    </Link>
                                </li>  <li>
                                <Link href="/shop">
                                    <i className="bi bi-chevron-double-right"></i>
                                        Spices
                                    </Link>
                                </li>
                              
                                <li>
                                <Link href="/shop">
                                    <i className="bi bi-chevron-double-right"></i>
                                        Vegetable
                                    </Link>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                        <div className="single-footer-widget text-white">
                            <div className="widget-head">
                                <h3>Contact Us</h3>
                            </div>
                            <ul className="list-area">
                                <li className="mb-2">
                                    Monday – Friday: <span className="text-white"> 8am – 4pm </span>
                                </li>
                                <li>
                                    Saturday: <span className="text-white"> 8am – 12am </span>
                                </li>
                            </ul>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">
                <div className="footer-wrapper d-flex align-items-center justify-content-between">
                    <p className="wow fadeInLeft" data-wow-delay=".3s">
                        © All Copyright 2024 by <a href="#">Omega Foods</a>
                    </p>
                    {/* <ul className="brand-logo wow fadeInRight" data-wow-delay=".5s">
                        <li>
                            <a className="text-white" href="#">
                                Terms & Condition
                            </a>
                        </li>
                        <li>
                            <a className="text-white" href="#">
                                Privacy Policy
                            </a>
                        </li>
                    </ul> */}
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer1;