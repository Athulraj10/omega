"use client"
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import loadBackgroudImages from "./loadBackgroudImages";
import Link from "next/link";

const BreadCumb = ({Title,bgimg}) => {
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";
    
    useEffect(() => {
        loadBackgroudImages();
      }, []);

    return (

        <div className="breadcumb-section">
        <div className="breadcumb-wrapper" data-background={bgimg}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={`breadcumb-content ${isAboutPage ? 'breadcumb-about' : ''}`}>
                            <h1 className="breadcumb-title">{Title}</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li className="text-white">/</li>
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