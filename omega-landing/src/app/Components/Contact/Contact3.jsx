"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Contact3 = ({ locale = 'en' }) => {
    const [contactInfo, setContactInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToTerms: false
    });
    const [formStatus, setFormStatus] = useState({
        submitting: false,
        success: false,
        error: null
    });

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/contact-info?locale=${locale}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch contact info');
                }
                const result = await response.json();
                if (result.success) {
                    setContactInfo(result.data);
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
                // Use default data on error
                setContactInfo(getDefaultContactInfo());
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, [locale]);

    const getDefaultContactInfo = () => ({
        address: {
            title: "Our Address",
            value: "Abu Dhabi, UAE",
            icon: "/assets/img/icon/location_blue.png",
            description: "Visit our location for fresh seafood"
        },
        email: {
            title: "Email Us",
            value: "omegaseafoods.general@gmail.com",
            icon: "/assets/img/icon/gmail_blue.png",
            description: "Email us anytime for any kind of query about our premium seafood products."
        },
        phone: {
            title: "Call Us",
            value: "+971 55 545 1188",
            icon: "/assets/img/icon/phone_blue.png",
            description: "24/7/365 priority Live Chat and ticketing support for all your seafood needs."
        },
        hours: {
            title: "Opening Hours",
            value: "Monday – Friday: 8am – 4pm\nSaturday: 8am – 12pm\nSunday: Closed",
            icon: "/assets/img/icon/clock_blue.png",
            description: ""
        },
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28821.965472924858!2d54.3773438!3d24.4538848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6716b5e6b5e5%3A0x4b4b4b4b4b4b4b!2sAbu%20Dhabi%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1234567890!5m2!1sen!2sae",
        formTitle: "Get in Touch",
        formDescription: "Have questions about our premium seafood products? We're here to help!",
        subjectOptions: [
            { value: "product-inquiry", label: "Product Inquiry" },
            { value: "order-status", label: "Order Status" },
            { value: "wholesale", label: "Wholesale Inquiry" },
            { value: "custom-order", label: "Custom Order Request" },
            { value: "complaint", label: "Complaint" },
            { value: "feedback", label: "Feedback" },
            { value: "other", label: "Other" }
        ],
        termsText: "I agree to the terms and conditions and privacy policy"
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.agreeToTerms) {
            setFormStatus({
                submitting: false,
                success: false,
                error: 'Please agree to the terms and conditions'
            });
            return;
        }

        setFormStatus({ submitting: true, success: false, error: null });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setFormStatus({
                    submitting: false,
                    success: true,
                    error: null
                });
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                    agreeToTerms: false
                });
                // Clear success message after 5 seconds
                setTimeout(() => {
                    setFormStatus(prev => ({ ...prev, success: false }));
                }, 5000);
            } else {
                setFormStatus({
                    submitting: false,
                    success: false,
                    error: result.error || 'Failed to send message. Please try again.'
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus({
                submitting: false,
                success: false,
                error: 'An error occurred. Please try again later.'
            });
        }
    };

    const data = contactInfo || getDefaultContactInfo();

    if (loading) {
        return (
            <div className="contact-us-section section-padding fix">
                <div className="container">
                    <div className="text-center py-5">
                        <p>Loading contact information...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .contact-us-section {
                    padding: 40px 0;
                }
                @media (min-width: 768px) {
                    .contact-us-section {
                        padding: 60px 0;
                    }
                }
                @media (min-width: 992px) {
                    .contact-us-section {
                        padding: 80px 0;
                    }
                }
                .contact-box-wrapper {
                    padding: 20px 15px;
                }
                @media (min-width: 576px) {
                    .contact-box-wrapper {
                        padding: 30px 20px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-box-wrapper {
                        padding: 40px 30px;
                    }
                }
                @media (min-width: 992px) {
                    .contact-box-wrapper {
                        padding: 50px 40px;
                    }
                }
                .contact-box {
                    padding: 25px 20px;
                    text-align: center;
                    border-radius: 12px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .contact-box:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }
                @media (min-width: 576px) {
                    .contact-box {
                        padding: 30px 25px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-box {
                        padding: 35px 30px;
                    }
                }
                .contact-icon {
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .contact-icon img {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                }
                @media (min-width: 576px) {
                    .contact-icon img {
                        width: 70px;
                        height: 70px;
                    }
                }
                .contact-box .title,
                .contact-box h3.title {
                    font-size: 18px;
                    margin-bottom: 12px;
                    color: #0D5189 !important;
                    font-weight: 600;
                }
                @media (min-width: 576px) {
                    .contact-box .title {
                        font-size: 20px;
                        margin-bottom: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-box .title {
                        font-size: 22px;
                        margin-bottom: 18px;
                    }
                }
                .contact-box p {
                    font-size: 14px;
                    line-height: 1.6;
                    margin-bottom: 10px;
                    color: #0D5189;
                }
                @media (min-width: 576px) {
                    .contact-box p {
                        font-size: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-box p {
                        font-size: 16px;
                    }
                }
                .contact-box small {
                    font-size: 12px;
                    display: block;
                    margin-top: 8px;
                    color: #0D5189;
                }
                @media (min-width: 576px) {
                    .contact-box small {
                        font-size: 13px;
                    }
                }
                .contact-form-section {
                    padding: 40px 0;
                }
                @media (min-width: 768px) {
                    .contact-form-section {
                        padding: 60px 0;
                    }
                }
                @media (min-width: 992px) {
                    .contact-form-section {
                        padding: 80px 0;
                    }
                }
                .contact-form-wrapper {
                    padding: 20px 15px;
                    overflow: visible;
                }
                @media (min-width: 576px) {
                    .contact-form-wrapper {
                        padding: 30px 20px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-form-wrapper {
                        padding: 40px 30px;
                    }
                }
                @media (min-width: 992px) {
                    .contact-form-wrapper {
                        padding: 50px 40px;
                    }
                }
                .contact-form-section.style2 {
                    overflow: visible !important;
                    margin-bottom: 0 !important;
                }
                .contact-form-section.style2.fix {
                    overflow: visible !important;
                    margin-bottom: 0 !important;
                }
                .contact-form-section.style2 .container {
                    overflow: visible !important;
                }
                .contact-form-wrapper.style2 {
                    overflow: visible !important;
                }
                .contact-form-wrapper.style2 .container {
                    overflow: visible !important;
                }
                .contact-form-wrapper.style2 .contact-form-thumb {
                    width: 100% !important;
                    margin-left: 0 !important;
                    padding: 20px !important;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    background: transparent;
                    border-radius: 12px;
                    overflow: visible !important;
                    min-height: 300px;
                    position: relative;
                    z-index: 1;
                }
                @media (min-width: 576px) {
                    .contact-form-wrapper.style2 .contact-form-thumb {
                        padding: 25px !important;
                        min-height: 350px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-form-wrapper.style2 .contact-form-thumb {
                        padding: 30px !important;
                        min-height: 400px;
                    }
                }
                @media (min-width: 992px) {
                    .contact-form-wrapper.style2 .contact-form-thumb {
                        padding: 40px !important;
                        min-height: 500px;
                    }
                }
                .contact-form-wrapper.style2 .contact-form-thumb img {
                    width: 100% !important;
                    height: auto !important;
                    max-width: 100% !important;
                    max-height: none !important;
                    object-fit: contain !important;
                    object-position: left center;
                    display: block;
                    border-radius: 0;
                    filter: none;
                    opacity: 1;
                }
                @media (min-width: 576px) {
                    .contact-form-wrapper.style2 .contact-form-thumb img {
                        width: 100% !important;
                    }
                }
                @media (min-width: 768px) {
                    .contact-form-wrapper.style2 .contact-form-thumb img {
                        width: 100% !important;
                    }
                }
                @media (min-width: 992px) {
                    .contact-form-wrapper.style2 .contact-form-thumb img {
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                }
                .contact-form-wrapper.style2 .row .col-xl-6:first-child {
                    display: flex;
                    align-items: center;
                    overflow: visible !important;
                    padding-left: 15px;
                    padding-right: 15px;
                }
                .contact-form-wrapper {
                    overflow: visible;
                }
                .contact-form-wrapper .container {
                    overflow: visible;
                }
                .contact-form-wrapper.style2 .row.gx-60 {
                    overflow: visible !important;
                }
                .contact-form-wrapper.style2 .row.gx-60 > * {
                    overflow: visible !important;
                }
                .contact-form-section.style2 .row.gx-60 {
                    overflow: visible !important;
                }
                .contact-form-section.style2 .row.gx-60 > * {
                    overflow: visible !important;
                }
                .contact-form {
                    padding: 20px 15px;
                }
                @media (min-width: 576px) {
                    .contact-form {
                        padding: 25px 20px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-form {
                        padding: 30px 25px;
                    }
                }
                @media (min-width: 992px) {
                    .contact-form {
                        padding: 40px 35px;
                    }
                }
                .contact-form h2 {
                    font-size: 28px;
                    margin-bottom: 15px;
                    color: #0D5189;
                    font-weight: 700;
                }
                @media (min-width: 576px) {
                    .contact-form h2 {
                        font-size: 32px;
                        margin-bottom: 18px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-form h2 {
                        font-size: 36px;
                        margin-bottom: 20px;
                    }
                }
                @media (min-width: 992px) {
                    .contact-form h2 {
                        font-size: 40px;
                        margin-bottom: 24px;
                    }
                }
                .contact-form p {
                    font-size: 14px;
                    line-height: 1.7;
                    color: #0D5189;
                    margin-bottom: 25px;
                }
                @media (min-width: 576px) {
                    .contact-form p {
                        font-size: 15px;
                        margin-bottom: 30px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-form p {
                        font-size: 16px;
                        margin-bottom: 35px;
                    }
                }
                .contact-form form {
                    margin-top: 20px;
                }
                .contact-form input[type="text"],
                .contact-form input[type="email"],
                .contact-form input[type="tel"],
                .contact-form select,
                .contact-form textarea {
                    width: 100%;
                    padding: 12px 15px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }
                @media (min-width: 576px) {
                    .contact-form input[type="text"],
                    .contact-form input[type="email"],
                    .contact-form input[type="tel"],
                    .contact-form select,
                    .contact-form textarea {
                        padding: 14px 18px;
                        font-size: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .contact-form input[type="text"],
                    .contact-form input[type="email"],
                    .contact-form input[type="tel"],
                    .contact-form select,
                    .contact-form textarea {
                        padding: 16px 20px;
                        font-size: 16px;
                    }
                }
                .contact-form input:focus,
                .contact-form select:focus,
                .contact-form textarea:focus {
                    outline: none;
                    border-color: #0D5189;
                    box-shadow: 0 0 0 3px rgba(13, 81, 137, 0.1);
                }
                .contact-form textarea {
                    resize: vertical;
                    min-height: 120px;
                }
                @media (min-width: 768px) {
                    .contact-form textarea {
                        min-height: 150px;
                    }
                }
                .contact-form .form-group {
                    margin-bottom: 20px;
                }
                .contact-form .alert {
                    padding: 15px 20px;
                    margin-bottom: 25px;
                    border-radius: 8px;
                    font-size: 14px;
                }
                @media (min-width: 576px) {
                    .contact-form .alert {
                        padding: 18px 24px;
                        font-size: 15px;
                    }
                }
                .map-wrapper {
                    width: 100%;
                    padding: 0;
                    margin-top: 0;
                }
                .map-wrapper iframe {
                    width: 100%;
                    height: 400px;
                    border: 0;
                    display: block;
                }
                @media (min-width: 768px) {
                    .map-wrapper iframe {
                        height: 500px;
                    }
                }
                @media (min-width: 992px) {
                    .map-wrapper iframe {
                        height: 550px;
                    }
                }
                .row.gy-4 > * {
                    padding-bottom: 1rem;
                }
                @media (min-width: 768px) {
                    .row.gy-4 > * {
                        padding-bottom: 0;
                    }
                }
                .row.gx-60 {
                    --bs-gutter-x: 1.5rem;
                }
                @media (min-width: 992px) {
                    .row.gx-60 {
                        --bs-gutter-x: 3.75rem;
                    }
                }
                .row.gy-5 {
                    --bs-gutter-y: 2rem;
                }
                @media (min-width: 768px) {
                    .row.gy-5 {
                        --bs-gutter-y: 3rem;
                    }
                }
            `}} />
        <div>
            <div className="contact-us-section section-padding fix ">
                <div className="contact-box-wrapper style1">
                    <div className="container">
                        <div className="row gy-4 ">
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 h-100">
                                    <div className="contact-icon">
                                        <Image src={data.address.icon} alt="img" width={70} height={70} />
                                    </div>
                                    <h3 className="title">{data.address.title}</h3>
                                    <p>{data.address.value}</p>
                                    {data.address.description && <small className="text-muted">{data.address.description}</small>}
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 h-100">
                                    <div className="contact-icon">
                                        <Image src={data.email.icon} alt="img" width={70} height={70} />
                                    </div>
                                    <h3 className="title">{data.email.value}</h3>
                                    <p>{data.email.description}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 h-100">
                                    <div className="contact-icon">
                                        <Image src={data.phone.icon} alt="img" width={70} height={70} />
                                    </div>
                                    <h3 className="title">{data.phone.title}: {data.phone.value}</h3>
                                    <p>{data.phone.description}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 h-100">
                                    <div className="contact-icon">
                                        <Image src={data.hours.icon} alt="img" width={70} height={70} />
                                    </div>
                                    <h3 className="title">{data.hours.title}</h3>
                                    <p style={{ whiteSpace: 'pre-line' }}>{data.hours.value}</p>
                                    {data.hours.description && <small className="text-muted">{data.hours.description}</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-form-section section-padding pt-0 fix">
                <div className="contact-form-wrapper style2">
                    <div className="container">
                        <div className="row gx-60 gy-5">
                            <div className="col-xl-6">
                                <div className="contact-form-thumb">
                                    <Image 
                                        src="/assets/img/contact/contactThumb2_1.png" 
                                        alt="Contact Us" 
                                        width={933} 
                                        height={634}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxWidth: '100%',
                                            objectFit: 'contain',
                                            objectPosition: 'left center',
                                            display: 'block'
                                        }}
                                        priority
                                        quality={95}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="contact-form style2">
                                    <h2>{data.formTitle}</h2>
                                    {data.formDescription && <p className="mb-4">{data.formDescription}</p>}
                                    
                                    {formStatus.success && (
                                        <div className="alert alert-success" role="alert">
                                            <i className="bi bi-check-circle me-2"></i>
                                            Your message has been sent successfully! We will get back to you soon.
                                        </div>
                                    )}
                                    
                                    {formStatus.error && (
                                        <div className="alert alert-danger" role="alert">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formStatus.error}
                                        </div>
                                    )}

                                    <form className="row" onSubmit={handleSubmit}>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Full Name"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                disabled={formStatus.submitting}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                disabled={formStatus.submitting}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                disabled={formStatus.submitting}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <select
                                                name="subject"
                                                className="single-select"
                                                aria-label="Subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                disabled={formStatus.submitting}
                                            >
                                                <option value="">Select Subject</option>
                                                {data.subjectOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <textarea
                                                id="message"
                                                name="message"
                                                className="form-control"
                                                placeholder="Write your message here..."
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                disabled={formStatus.submitting}
                                            ></textarea>
                                        </div>
                                        <div className="col-12 form-group">
                                            <input
                                                id="reviewcheck"
                                                name="agreeToTerms"
                                                type="checkbox"
                                                checked={formData.agreeToTerms}
                                                onChange={handleInputChange}
                                                disabled={formStatus.submitting}
                                                required
                                            />
                                            <label htmlFor="reviewcheck">
                                                {data.termsText}
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="col-12 form-group mb-0">
                                            <button
                                                type="submit"
                                                className="theme-btn w-100"
                                                disabled={formStatus.submitting}
                                            >
                                                {formStatus.submitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        SUBMIT NOW <i className="bi bi-arrow-right bg-transparent text-white"></i>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="map-wrapper contact-area-map">
                <iframe
                    src={data.mapUrl}
                    height="550"
                    loading="lazy"
                    style={{ width: '100%', border: 0 }}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
        </>
    );
};

export default Contact3;
