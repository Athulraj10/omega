"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CtaBanner1 = () => {
    const pathname = usePathname();
    return (
        <section className="cta-section fix pt-5">
        <div className="cta-wrapper style1 p-0">
            <div className="container">
                <div className="cta-wrap style1">
                    {/* Main Heading and Description */}
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="cta-content text-center">
                                <h3 className="wow fadeInUp" data-wow-delay="0.5s" style={{ color: '#1a365d', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    Ensuring Freshness & Quality in Every Step
                                </h3>
                                <p className="wow fadeInUp" data-wow-delay="0.7s" style={{ color: '#1a365d', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
                                    At Omega Seafoods, we adhere to the highest standards of hygiene and quality. From careful handling of freshly caught fish to expert packaging in insulated Styrofoam boxes, our dedicated team works diligently in a state-of-the-art facility to ensure that every product meets our strict freshness and safety standards.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Two Image Sections */}
                    <div className="row">
                        {/* Left Section - Precision in Processing */}
                        <div className="col-lg-6 col-md-6 mb-4 mb-lg-0">
                            <div className="cta-content-item wow fadeInUp" data-wow-delay="0.8s">
                                <div className="cta-thumb mb-4">
                                    <Image 
                                        className="img-fluid rounded" 
                                        src="/assets/img/cta/processing no bg (1).webp" 
                                        alt="Precision in Processing" 
                                        width={500} 
                                        height={300}
                                        style={{ objectFit:  'cover', width: '100%', height: '350px' }}
                                    />
                                </div>
                                <h4 style={{ color: '#1a365d', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    Precision in Processing
                                </h4>
                                <p style={{ color: '#1a365d', fontSize: '1rem', lineHeight: '1.6' }}>
                                    Our team carefully prepares and inspect fresh fish to maintain top quality.
                                </p>
                            </div>
                        </div>

                        {/* Right Section - Secure Packaging */}
                        <div className="col-lg-6 col-md-6">
                            <div className="cta-content-item wow fadeInUp" data-wow-delay="1s">
                                <div className="cta-thumb mb-4">
                                    <Image 
                                        className="img-fluid rounded" 
                                        src="/assets/img/cta/packed fish in chiller.webp" 
                                        alt="Secure Packaging" 
                                        width={500} 
                                        height={300}
                                        style={{ objectFit: 'cover', width: '100%', height: '350px' }}
                                    />
                                </div>
                                <h4 style={{ color: '#1a365d', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    Secure Packaging
                                </h4>
                                <p style={{ color: '#1a365d', fontSize: '1rem', lineHeight: '1.6', position: 'relative' }}>
                                    We use insulated boxes to keep seafood fresh and safe during transport.
                                    {pathname !== '/about' && (
                                    <Image 
                                        className="img-fluid rounded" 
                                        src="/assets/img/cta/boat picture.webp" 
                                        alt="Boat" 
                                        width={200} 
                                        height={250} 
                                        style={{ 
                                            position: 'absolute',
                                            right: 0,
                                            left: '70%',
                                            top: '100%',
                                            transform: 'translateY(-70%)',
                                            objectFit: 'contain',
                                            width: '450px',
                                            height: '450px',
                                            maxWidth: '450px',
                                            maxHeight: '350px',
                                            zIndex: 1
                                        }} 
                                    />
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default CtaBanner1;