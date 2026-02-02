"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const Footer1 = ({ locale = 'en', context = 'default' }) => {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [expandedSections, setExpandedSections] = useState({});
    const footerRef = useRef(null);
    const lastScrollY = useRef(0);

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY.current) {
                setScrollDirection('up');
            }
            
            lastScrollY.current = currentScrollY;
        };

        // Check if footer is already visible on mount
        const checkInitialVisibility = () => {
            if (footerRef.current) {
                const rect = footerRef.current.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                // Also check if we're near the bottom of the page (footer is likely visible)
                const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
                if (isInViewport || isNearBottom) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 100);
                }
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Stagger the animation trigger slightly for smoother effect
                        setTimeout(() => {
                            setIsVisible(true);
                        }, 50);
                    } else {
                        // Only hide if scrolling away significantly
                        if (entry.boundingClientRect.top > window.innerHeight) {
                            setIsVisible(false);
                        }
                    }
                });
            },
            {
                threshold: 0.01,
                rootMargin: '0px 0px 0px 0px'
            }
        );

        const currentRef = footerRef.current;
        let fallbackTimeout;
        
        if (currentRef) {
            observer.observe(currentRef);
            // Check initial visibility
            checkInitialVisibility();
            // Also check after a short delay as fallback
            setTimeout(() => {
                checkInitialVisibility();
            }, 500);
            // Final fallback - always show content after 500ms to ensure visibility
            fallbackTimeout = setTimeout(() => {
                setIsVisible(true);
            }, 500);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (fallbackTimeout) {
                clearTimeout(fallbackTimeout);
            }
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                value: "omegaseafoods.general@gmail.com"
            },
            phone: {
                icon: "bi bi-telephone-fill",
                title: "call",
                value: "+971 55 545 1188"
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
                { day: "24 Hours", time: "24 Hours" }
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
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .footer-section .footer-widget {
                    opacity: 0;
                    transition: opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
                    will-change: transform, opacity;
                }
                /* Fallback: Show content if no animation class after 1 second */
                @keyframes showContent {
                    to {
                        opacity: 1;
                        transform: translateX(0) translateY(0) scale(1) rotateY(0deg) rotateX(0deg);
                        filter: blur(0px);
                    }
                }
                /* Ensure content is visible after 1.5 seconds regardless */
                .footer-section .footer-widget:not(.animate) {
                    animation: showContent 0.3s ease-out 1.5s forwards;
                }
                .footer-section .footer-widget.fade-from-left {
                    transform: translateX(-80px) scale(0.85) rotateY(-15deg);
                    filter: blur(4px);
                }
                .footer-section .footer-widget.fade-from-left.animate {
                    opacity: 1;
                    transform: translateX(0) scale(1) rotateY(0deg);
                    filter: blur(0px);
                }
                .footer-section .footer-widget.fade-from-right {
                    transform: translateX(80px) scale(0.85) rotateY(15deg);
                    filter: blur(4px);
                }
                .footer-section .footer-widget.fade-from-right.animate {
                    opacity: 1;
                    transform: translateX(0) scale(1) rotateY(0deg);
                    filter: blur(0px);
                }
                .footer-section .footer-widget.fade-from-bottom {
                    transform: translateY(80px) scale(0.85) rotateX(-15deg);
                    filter: blur(4px);
                }
                .footer-section .footer-widget.fade-from-bottom.animate {
                    opacity: 1;
                    transform: translateY(0) scale(1) rotateX(0deg);
                    filter: blur(0px);
                }
                .footer-section .footer-widget.fade-from-top {
                    transform: translateY(-80px) scale(0.85) rotateX(15deg);
                    filter: blur(4px);
                }
                .footer-section .footer-widget.fade-from-top.animate {
                    opacity: 1;
                    transform: translateY(0) scale(1) rotateX(0deg);
                    filter: blur(0px);
                }
                .footer-section .footer-list-item {
                    opacity: 0;
                    transform: translateX(-30px) scale(0.9);
                    transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                    will-change: transform, opacity;
                    animation: showListItem 0.3s ease-out 1.8s forwards;
                }
                @keyframes showListItem {
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
                .footer-section .footer-list-item.animate {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
                .footer-section .footer-list-item:hover {
                    transform: translateX(8px) scale(1.03);
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .footer-section .footer-decorative {
                    opacity: 0;
                    transform: scale(0.3) rotate(-25deg) translateY(80px);
                    filter: blur(8px);
                    transition: opacity 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 1.5s ease-out;
                    will-change: transform, opacity, filter;
                    animation: showDecorative 0.3s ease-out 2s forwards;
                    position: absolute;
                    z-index: 1;
                    pointer-events: none;
                    display: none;
                }
                @media (min-width: 1400px) {
                    .footer-section .footer-decorative {
                        display: block;
                        bottom: 20%;
                        right: 5%;
                        width: 200px;
                        height: 200px;
                    }
                }
                @media (min-width: 1600px) {
                    .footer-section .footer-decorative {
                        width: 250px;
                        height: 250px;
                        right: 8%;
                    }
                }
                @media (min-width: 1800px) {
                    .footer-section .footer-decorative {
                        width: 300px;
                        height: 300px;
                        right: 10%;
                    }
                }
                .footer-section .footer-decorative img {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: contain;
                }
                @keyframes showDecorative {
                    to {
                        opacity: 1;
                        transform: scale(1) rotate(0deg) translateY(0);
                        filter: blur(0px);
                    }
                }
                .footer-section .footer-decorative.animate {
                    opacity: 1;
                    transform: scale(1) rotate(0deg) translateY(0);
                    filter: blur(0px);
                }
                .footer-section .footer-copyright {
                    opacity: 0;
                    transform: translateY(60px) scale(0.9);
                    filter: blur(3px);
                    transition: opacity 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), filter 1.2s ease-out;
                    will-change: transform, opacity, filter;
                    animation: showCopyright 0.3s ease-out 2.2s forwards;
                }
                @keyframes showCopyright {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0px);
                    }
                }
                .footer-section .footer-copyright.animate {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0px);
                }
                .footer-section .widget-head h3 {
                    opacity: 0;
                    transform: translateY(-25px) scale(0.85);
                    filter: blur(2px);
                    transition: opacity 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.9s ease-out;
                    will-change: transform, opacity, filter;
                    animation: showHeading 0.3s ease-out 1.6s forwards;
                }
                @keyframes showHeading {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0px);
                    }
                }
                .footer-section .widget-head.animate h3 {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0px);
                }
                .footer-section .list-area {
                    overflow: hidden;
                }
                .footer-section .footer-widgets-wrapper {
                    position: relative;
                    overflow: hidden;
                }
                .footer-section .footer-widgets-wrapper .container {
                    position: relative;
                    z-index: 2;
                }
                .footer-section .single-footer-widget {
                    position: relative;
                    z-index: 2;
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-15px) rotate(2deg);
                    }
                    50% {
                        transform: translateY(-25px) rotate(0deg);
                    }
                    75% {
                        transform: translateY(-15px) rotate(-2deg);
                    }
                }
                .footer-section .footer-decorative.animate {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }
                .footer-section .footer-widget.animate::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite;
                    pointer-events: none;
                    opacity: 0;
                }
                /* Mobile Responsive Spacing */
                .footer-section {
                    padding: 20px 15px !important;
                }
                @media (min-width: 375px) {
                    .footer-section {
                        padding: 30px 20px !important;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section {
                        padding: 40px 25px !important;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section {
                        padding: 50px 30px !important;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section {
                        padding: 3rem !important;
                    }
                }
                .footer-section .row {
                    margin-left: -8px;
                    margin-right: -8px;
                    margin-bottom: 0;
                }
                @media (min-width: 576px) {
                    .footer-section .row {
                        margin-left: -10px;
                        margin-right: -10px;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .row {
                        margin-left: -15px;
                        margin-right: -15px;
                    }
                }
                .footer-section .row > [class*="col-"] {
                    padding-left: 8px;
                    padding-right: 8px;
                    margin-bottom: 25px;
                }
                @media (min-width: 375px) {
                    .footer-section .row > [class*="col-"] {
                        padding-left: 10px;
                        padding-right: 10px;
                        margin-bottom: 30px;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section .row > [class*="col-"] {
                        padding-left: 12px;
                        padding-right: 12px;
                        margin-bottom: 35px;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .row > [class*="col-"] {
                        padding-left: 15px;
                        padding-right: 15px;
                        margin-bottom: 40px;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .row > [class*="col-"] {
                        margin-bottom: 0;
                    }
                }
                .footer-section .single-footer-widget {
                    margin-bottom: 15px;
                }
                @media (min-width: 576px) {
                    .footer-section .single-footer-widget {
                        margin-bottom: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .single-footer-widget {
                        margin-bottom: 25px;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .single-footer-widget {
                        margin-bottom: 0;
                    }
                }
                .footer-section .widget-head {
                    margin-bottom: 12px;
                }
                @media (min-width: 375px) {
                    .footer-section .widget-head {
                        margin-bottom: 15px;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section .widget-head {
                        margin-bottom: 18px;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .widget-head {
                        margin-bottom: 20px;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .widget-head {
                        margin-bottom: 25px;
                    }
                }
                .footer-section .widget-head h3 {
                    font-size: 16px !important;
                    margin-bottom: 0;
                    line-height: 1.3;
                }
                @media (min-width: 375px) {
                    .footer-section .widget-head h3 {
                        font-size: 17px !important;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section .widget-head h3 {
                        font-size: 18px !important;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .widget-head h3 {
                        font-size: 20px !important;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .widget-head h3 {
                        font-size: 22px !important;
                    }
                }
                .footer-section .list-area {
                    margin-bottom: 0;
                    padding-left: 0;
                }
                .footer-section .footer-list-item {
                    margin-bottom: 8px;
                    padding: 4px 0;
                }
                @media (min-width: 375px) {
                    .footer-section .footer-list-item {
                        margin-bottom: 10px;
                        padding: 5px 0;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section .footer-list-item {
                        margin-bottom: 12px;
                        padding: 6px 0;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .footer-list-item {
                        margin-bottom: 14px;
                        padding: 8px 0;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .footer-list-item {
                        margin-bottom: 15px;
                        padding: 10px 0;
                    }
                }
                .footer-section .footer-list-item a,
                .footer-section .footer-list-item span {
                    font-size: 13px;
                    line-height: 1.5;
                }
                @media (min-width: 375px) {
                    .footer-section .footer-list-item a,
                    .footer-section .footer-list-item span {
                        font-size: 14px;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section .footer-list-item a,
                    .footer-section .footer-list-item span {
                        font-size: 15px;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .footer-list-item a,
                    .footer-section .footer-list-item span {
                        font-size: 16px;
                    }
                }
                /* Footer Bottom - Clean Styles */
                .footer-section .footer-bottom {
                    margin: 0 !important;
                    padding: 15px 0 !important;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    width: 100%;
                    position: relative;
                    z-index: 2;
                }
                @media (min-width: 576px) {
                    .footer-section .footer-bottom {
                        padding: 20px 0 !important;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .footer-bottom {
                        padding: 25px 0 !important;
                    }
                }
                .footer-section .footer-bottom .container {
                    margin: 0 auto !important;
                    padding: 0 15px !important;
                    max-width: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                @media (min-width: 576px) {
                    .footer-section .footer-bottom .container {
                        padding: 0 20px !important;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .footer-bottom .container {
                        padding: 0 30px !important;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .footer-bottom .container {
                        padding: 0 15px !important;
                        max-width: 1140px;
                    }
                }
                .footer-section .footer-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    margin: 0 !important;
                    padding: 0 !important;
                    text-align: center;
                }
                .footer-section .footer-copyright {
                    font-size: 12px;
                    line-height: 1.5;
                    margin: 0 auto !important;
                    padding: 0 !important;
                    color: #ffffff;
                    text-align: center !important;
                    width: 100%;
                    display: block;
                }
                @media (min-width: 375px) {
                    .footer-section .footer-copyright {
                        font-size: 13px;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section .footer-copyright {
                        font-size: 14px;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .footer-copyright {
                        font-size: 15px;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .footer-copyright {
                        font-size: 16px;
                        text-align: center !important;
                    }
                }
                .footer-section .footer-copyright a {
                    color: #ffffff;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }
                .footer-section .footer-copyright a:hover {
                    opacity: 0.8;
                }
                .footer-section .container {
                    padding-left: 10px;
                    padding-right: 10px;
                }
                @media (min-width: 375px) {
                    .footer-section .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                @media (min-width: 576px) {
                    .footer-section .container {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
                @media (min-width: 768px) {
                    .footer-section .container {
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                }
                @media (min-width: 992px) {
                    .footer-section .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
                
                /* Mobile Accordion Styles */
                .footer-accordion-header {
                    display: none;
                    width: 100%;
                    background: transparent;
                    border: none;
                    padding: 15px 0;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                    transition: all 0.3s ease;
                }
                .footer-accordion-header:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                @media (max-width: 991px) {
                    .footer-accordion-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                }
                .footer-accordion-header h3 {
                    margin: 0;
                    font-size: 16px;
                    color: #ffffff;
                    font-weight: 600;
                }
                @media (min-width: 375px) {
                    .footer-accordion-header h3 {
                        font-size: 17px;
                    }
                }
                @media (min-width: 576px) {
                    .footer-accordion-header h3 {
                        font-size: 18px;
                    }
                }
                .footer-accordion-arrow {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    color: #ffffff;
                    font-size: 14px;
                }
                .footer-accordion-arrow.expanded {
                    transform: rotate(180deg);
                }
                .footer-accordion-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease;
                    padding: 0;
                }
                @media (max-width: 991px) {
                    .footer-accordion-content {
                        padding: 0 10px;
                    }
                    .footer-accordion-content.expanded {
                        max-height: 500px;
                        padding: 15px 10px;
                    }
                }
                @media (min-width: 992px) {
                    .footer-accordion-content {
                        max-height: none !important;
                        overflow: visible;
                        padding: 0 !important;
                    }
                }
                /* Hide desktop widget-head on mobile */
                @media (max-width: 991px) {
                    .footer-section .widget-head {
                        display: none;
                    }
                    .footer-section .single-footer-widget {
                        align-items: stretch !important;
                        text-align: left !important;
                    }
                }
                /* Mobile Grid Layout - 2 columns */
                @media (max-width: 991px) {
                    .footer-section .footer-mobile-grid {
                        display: grid !important;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0;
                    }
                    .footer-section .footer-mobile-grid > div {
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .footer-section .footer-mobile-grid > div:nth-child(odd) {
                        border-right: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .footer-section .footer-mobile-grid > div:last-child,
                    .footer-section .footer-mobile-grid > div:nth-last-child(2):nth-child(odd) ~ div {
                        border-bottom: none;
                    }
                }
                @media (max-width: 575px) {
                    .footer-section .footer-mobile-grid {
                        grid-template-columns: 1fr;
                    }
                    .footer-section .footer-mobile-grid > div {
                        border-right: none !important;
                    }
                }
                /* Accordion list items animation */
                .footer-accordion-content .list-area {
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
                }
                .footer-accordion-content.expanded .list-area {
                    opacity: 1;
                    transform: translateY(0);
                }
                @media (min-width: 992px) {
                    .footer-accordion-content .list-area {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}} />
        <footer ref={footerRef} className="footer-section fix" style={{
            backgroundImage: `url(${data.backgroundImage || '/assets/img/footer/footer.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
        <div className="footer-widgets-wrapper">
            <div className={`shape1 float-bob-y footer-decorative ${isVisible ? 'animate' : ''}`}>
                <Image 
                    src={data.decorativeImage || "/assets/img/footer/mussels.png"} 
                    alt="img" 
                    width={300} 
                    height={300}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
           
            <div className="container">
                <div className="row justify-content-center text-center footer-mobile-grid">
                    {/* Quick Links Section */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 m-0">
                        <div className={`single-footer-widget footer-widget fade-from-left ${isVisible ? 'animate' : ''} d-flex flex-column align-items-center`}>
                            {/* Desktop Header */}
                            <div className={`widget-head ${isVisible ? 'animate' : ''}`}>
                                <h3>{data.quickLinks.title}</h3>
                            </div>
                            {/* Mobile Accordion Header */}
                            <button 
                                className="footer-accordion-header"
                                onClick={() => toggleSection('quickLinks')}
                                aria-expanded={expandedSections.quickLinks}
                            >
                                <h3>{data.quickLinks.title}</h3>
                                <span className={`footer-accordion-arrow ${expandedSections.quickLinks ? 'expanded' : ''}`}>
                                    <i className="bi bi-chevron-down"></i>
                                </span>
                            </button>
                            {/* Content */}
                            <div className={`footer-accordion-content ${expandedSections.quickLinks ? 'expanded' : ''}`}>
                                <ul className="list-area">
                                    {data.quickLinks.links.map((link, index) => (
                                        <li 
                                            key={index} 
                                            className={`footer-list-item ${isVisible ? 'animate' : ''}`}
                                            style={{ transitionDelay: `${0.4 + index * 0.12}s` }}
                                        >
                                            <Link href={link.href}>
                                                <i className={link.icon}></i>
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Menu Section */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 m-0">
                        <div className={`single-footer-widget footer-widget fade-from-bottom ${isVisible ? 'animate' : ''} d-flex flex-column align-items-center`}>
                            {/* Desktop Header */}
                            <div className={`widget-head ${isVisible ? 'animate' : ''}`} style={{ transitionDelay: '0.2s' }}>
                                <h3>{data.menu.title}</h3>
                            </div>
                            {/* Mobile Accordion Header */}
                            <button 
                                className="footer-accordion-header"
                                onClick={() => toggleSection('menu')}
                                aria-expanded={expandedSections.menu}
                            >
                                <h3>{data.menu.title}</h3>
                                <span className={`footer-accordion-arrow ${expandedSections.menu ? 'expanded' : ''}`}>
                                    <i className="bi bi-chevron-down"></i>
                                </span>
                            </button>
                            {/* Content */}
                            <div className={`footer-accordion-content ${expandedSections.menu ? 'expanded' : ''}`}>
                                <ul className="list-area">
                                    {data.menu.links.slice(0, 4).map((link, index) => (
                                        <li 
                                            key={index} 
                                            className={`footer-list-item ${isVisible ? 'animate' : ''}`}
                                            style={{ transitionDelay: `${0.5 + index * 0.12}s` }}
                                        >
                                            <Link href={link.href}>
                                                <i className={link.icon}></i>
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 m-0">
                        <div className={`single-footer-widget footer-widget fade-from-top ${isVisible ? 'animate' : ''} text-white d-flex flex-column align-items-center`}>
                            {/* Desktop Header */}
                            <div className={`widget-head ${isVisible ? 'animate' : ''}`} style={{ transitionDelay: '0.4s' }}>
                                <h3>Products</h3>
                            </div>
                            {/* Mobile Accordion Header */}
                            <button 
                                className="footer-accordion-header"
                                onClick={() => toggleSection('products')}
                                aria-expanded={expandedSections.products}
                            >
                                <h3>Products</h3>
                                <span className={`footer-accordion-arrow ${expandedSections.products ? 'expanded' : ''}`}>
                                    <i className="bi bi-chevron-down"></i>
                                </span>
                            </button>
                            {/* Content */}
                            <div className={`footer-accordion-content ${expandedSections.products ? 'expanded' : ''}`}>
                                {data.menu.links.length > 4 && (
                                    <ul className="list-area">
                                        {data.menu.links.slice(4).map((link, index) => (
                                            <li 
                                                key={index + 4}
                                                className={`footer-list-item ${isVisible ? 'animate' : ''}`}
                                                style={{ transitionDelay: `${0.7 + index * 0.12}s` }}
                                            >
                                                <Link href={link.href}>
                                                    <i className={link.icon}></i>
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 m-0">
                        <div className={`single-footer-widget footer-widget fade-from-right ${isVisible ? 'animate' : ''} text-white d-flex flex-column align-items-center`}>
                            {/* Desktop Header */}
                            <div className={`widget-head ${isVisible ? 'animate' : ''}`} style={{ transitionDelay: '0.6s' }}>
                                <h3>Contact Info</h3>
                            </div>
                            {/* Mobile Accordion Header */}
                            <button 
                                className="footer-accordion-header"
                                onClick={() => toggleSection('contact')}
                                aria-expanded={expandedSections.contact}
                            >
                                <h3>Contact Info</h3>
                                <span className={`footer-accordion-arrow ${expandedSections.contact ? 'expanded' : ''}`}>
                                    <i className="bi bi-chevron-down"></i>
                                </span>
                            </button>
                            {/* Content */}
                            <div className={`footer-accordion-content ${expandedSections.contact ? 'expanded' : ''}`}>
                                <ul className="list-area">
                                    <li 
                                        className={`footer-list-item ${isVisible ? 'animate' : ''}`}
                                        style={{ transitionDelay: '0.9s' }}
                                    >
                                        <i className={data.contactInfo.address.icon}></i>
                                        <span className="text-white">{data.contactInfo.address.value}</span>
                                    </li>
                                    {data.contactUs.hours.map((hour, index) => (
                                        <li 
                                            key={index} 
                                            className={`footer-list-item ${isVisible ? 'animate' : ''} ${index === 0 ? "mb-2" : ""}`}
                                            style={{ transitionDelay: `${1.0 + index * 0.12}s` }}
                                        >
                                            {hour.day}: <span className="text-white">{hour.time}</span>
                                        </li>
                                    ))}
                                    <li 
                                        className={`footer-list-item ${isVisible ? 'animate' : ''}`}
                                        style={{ transitionDelay: '1.3s' }}
                                    >
                                        <i className={data.contactInfo.email.icon}></i>
                                        <a href={`mailto:${data.contactInfo.email.value}`} className="text-white">{data.contactInfo.email.value}</a>
                                    </li>
                                    <li 
                                        className={`footer-list-item ${isVisible ? 'animate' : ''}`}
                                        style={{ transitionDelay: '1.5s' }}
                                    >
                                        <i className={data.contactInfo.phone.icon}></i>
                                        <a href={`tel:${data.contactInfo.phone.value}`} className="text-white">{data.contactInfo.phone.value}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom ">
            <div className="container">
                <div className="footer-wrapper">
                    <p className={`footer-copyright ${isVisible ? 'animate' : ''} wow fadeInLeft`} data-wow-delay=".3s" style={{ transitionDelay: '1.7s' }}>
                        {data.copyright.text} <a href={data.copyright.companyLink}>{data.copyright.company}</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    </>
    );
};

export default Footer1;