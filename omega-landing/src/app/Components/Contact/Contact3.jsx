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
            icon: "/assets/img/icon/location.png",
            description: "Visit our location for fresh seafood"
        },
        email: {
            title: "Email Us",
            value: "info@omegafoods.com",
            icon: "/assets/img/icon/gmail.png",
            description: "Email us anytime for any kind of query about our premium seafood products."
        },
        phone: {
            title: "Call Us",
            value: "+971 55 545 1188",
            icon: "/assets/img/icon/phone.png",
            description: "24/7/365 priority Live Chat and ticketing support for all your seafood needs."
        },
        hours: {
            title: "Opening Hours",
            value: "Monday – Friday: 8am – 4pm\nSaturday: 8am – 12pm\nSunday: Closed",
            icon: "/assets/img/icon/clock.png",
            description: "Visit us during our business hours for the freshest seafood selection."
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
                                    <Image src="/assets/img/contact/contactThumb2_1.png" alt="img" width={933} height={634} />
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
    );
};

export default Contact3;
