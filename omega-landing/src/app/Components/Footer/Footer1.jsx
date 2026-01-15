"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer1 = ({ locale = 'en', context = 'default' }) => {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch from server.js API endpoint
                // Default to server.js on port 3001, fallback to Next.js API route
                // Use NEXT_PUBLIC_ prefix for client-side env variables
                const serverUrl = process.env.NEXT_PUBLIC_FOOTER_API_URL || 'http://localhost:3001';
                const apiUrl = `${serverUrl}/api/footer?locale=${locale}&context=${context}`;
                
                let response;
                try {
                    // Try server.js endpoint first (only if not in browser or if explicitly configured)
                    // In browser, same-origin policy might block localhost:3001, so we'll try Next.js API route first
                    if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_FOOTER_API_URL) {
                        // In browser without explicit config, use Next.js API route
                        throw new Error('Use Next.js API route');
                    }
                    response = await fetch(apiUrl);
                    // If server.js is not available, fallback to Next.js API route
                    if (!response.ok) {
                        throw new Error('Server.js endpoint not available');
                    }
                } catch (err) {
                    // Fallback to Next.js API route
                    const fallbackUrl = `/api/footer?locale=${locale}&context=${context}`;
                    response = await fetch(fallbackUrl);
                }
                
                if (!response.ok) {
                    throw new Error('Failed to fetch footer data');
                }
                
                const result = await response.json();
                
                if (result.success) {
                    setFooterData(result.data);
                } else {
                    throw new Error(result.error || 'Failed to load footer data');
                }
            } catch (err) {
                console.error('Error fetching footer data:', err);
                setError(err.message);
                // Fallback to default data
                setFooterData(getDefaultFooterData());
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, [locale, context]);

    // Default fallback data
    const getDefaultFooterData = () => ({
        contactInfo: {
            address: {
                icon: "bi bi-geo-alt-fill",
                title: "address",
                value: "Abu Dhabi, UAE"
            },
            email: {
                icon: "bi bi-envelope-fill",
                title: "send email",
                value: "info@omegafoods.com"
            },
            phone: {
                icon: "bi bi-telephone-fill",
                title: "call",
                value: "+971 56 888 8888"
            }
        },
        quickLinks: {
            title: "Quick Links",
            links: [
                { href: "/about", text: "About Us", icon: "bi bi-chevron-double-right" },
                { href: "/faq", text: "FAQ'S", icon: "bi bi-chevron-double-right" },
                { href: "/contact", text: "Contact Us", icon: "bi bi-chevron-double-right" }
            ]
        },
        menu: {
            title: "Our Menu",
            links: [
                { href: "/shop", text: "Seafood", icon: "bi bi-chevron-double-right" },
                { href: "/shop", text: "Fruits", icon: "bi bi-chevron-double-right" },
                { href: "/shop", text: "Spices", icon: "bi bi-chevron-double-right" },
                { href: "/shop", text: "Vegetable", icon: "bi bi-chevron-double-right" }
            ]
        },
        contactUs: {
            title: "Contact Us",
            hours: [
                { day: "Monday – Friday", time: "8am – 4pm" },
                { day: "Saturday", time: "8am – 12am" }
            ]
        },
        copyright: {
            text: "© All Copyright 2024 by",
            company: "Omega Foods",
            companyLink: "#"
        },
        backgroundImage: "/assets/img/footer/footer.png",
        decorativeImage: "/assets/img/footer/mussels.png"
    });

    // Use default data if still loading or if there's an error
    const data = footerData || getDefaultFooterData();

    if (loading && !footerData) {
        return (
            <footer className="footer-section fix">
                <div className="container">
                    <div className="text-center py-5">
                        <p className="text-white">Loading footer...</p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="footer-section fix" style={{
            backgroundImage: `url(${data.backgroundImage || '/assets/img/footer/footer.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
        <div className="footer-widgets-wrapper">
            <div className="shape1 float-bob-y d-none d-xxl-block">
                <Image 
                    src={data.decorativeImage || "/assets/img/footer/mussels.png"} 
                    alt="img" 
                    width={300} 
                    height={300}   
                />
            </div>
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
                                <div className="item1">
                                    <i className={data.contactInfo.address.icon}></i>
                                </div>
                                <div className="item2">
                                    <h6>{data.contactInfo.address.title}</h6>
                                    <p>{data.contactInfo.address.value}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                            <div className="fancy-box">
                                <div className="item1">
                                    <i className={data.contactInfo.email.icon}></i>
                                </div>
                                <div className="item2">
                                    <h6>{data.contactInfo.email.title}</h6>
                                    <p>{data.contactInfo.email.value}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                            <div className="fancy-box">
                                <div className="item1">
                                    <i className={data.contactInfo.phone.icon}></i>
                                </div>
                                <div className="item2">
                                    <h6>{data.contactInfo.phone.title}</h6>
                                    <p>{data.contactInfo.phone.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center text-center">
                    <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                        <div className="single-footer-widget">
                            <div className="widget-head">
                                <h3>{data.quickLinks.title}</h3>
                            </div>
                            <ul className="list-area">
                                {data.quickLinks.links.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href}>
                                            <i className={link.icon}></i>
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                        <div className="single-footer-widget">
                            <div className="widget-head">
                                <h3>{data.menu.title}</h3>
                            </div>
                            <ul className="list-area">
                                {data.menu.links.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href}>
                                            <i className={link.icon}></i>
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                        <div className="single-footer-widget text-white">
                            <div className="widget-head">
                                <h3>{data.contactUs.title}</h3>
                            </div>
                            <ul className="list-area">
                                {data.contactUs.hours.map((hour, index) => (
                                    <li key={index} className={index === 0 ? "mb-2" : ""}>
                                        {hour.day}: <span className="text-white">{hour.time}</span>
                                    </li>
                                ))}
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
                        {data.copyright.text} <a href={data.copyright.companyLink}>{data.copyright.company}</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer1;