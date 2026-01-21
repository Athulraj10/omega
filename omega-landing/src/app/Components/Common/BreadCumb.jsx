"use client"
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import loadBackgroudImages from "./loadBackgroudImages";
import Link from "next/link";

const BreadCumb = ({Title,bgimg}) => {
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";
    const isShopPage = pathname === "/shop";
    const isContactPage = pathname === "/contact";
    
    useEffect(() => {
        loadBackgroudImages();
      }, []);

      
    return (

    <div className="breadcumb-section">
        <div className={`breadcumb-wrapper ${isContactPage ? 'breadcumb-contact' : ''}`} data-background={isContactPage ? "/assets/img/contact/breadcrums.webp" : bgimg} style={{ position: 'relative' }}>
            {isShopPage && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(13, 58, 94, 0.33), rgba(13, 58, 94, 0.33))',
                    zIndex: 1
                }}></div>
            )}
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="row">
                    <div className="col-12">
                        <div className={`breadcumb-content ${isAboutPage ? 'breadcumb-about' : isShopPage ? 'breadcumb-shop' : ''}`}>
                            <h1 className="breadcumb-title">{Title}</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li style={{ color: '#fff' }}>/</li>
                                <li className="active">{Title}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
};

export default BreadCumb;