"use client"
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";

const Offer1 = () => {

    useEffect(() => {
        loadBackgroudImages();
      }, []);

      const offerItems = [
        {
          img:'/assets/img/offer/offerThumb1_1.png', 
          icon:'bi-check-circle',
          title:'PREMIUM SEAFOOD QUALITY', 
          content:'Delivering fresh, safe, and premium-quality seafood for <strong>more than 40 years.</strong> <Br>Our commitment to quality has never changed.', 
          slogan:'Trusted Quality Since 40+ Years'
        },      
        {
          img:'/assets/img/offer/offerThumb1_2.png', 
          icon:'bi-truck',
          title:'RELIABLE SUPPLY', 
          content:'Consistent sourcing, timely delivery, and dependable service <Br> Your reliable seafood partner every day.', 
          slogan:'Reliability Built Over Decades'
        },      
      ]; 

    return (
        <div className="offer-section fix bg-color2">
        <div className="offer-wrapper">
            <div className="container">
                <div className="row gy-4">
                {offerItems.map((item, i) => (
                    <div key={i} className="col-6">
                        <div className="offer-card style1-line wow fadeInUp" style={{backgroundImage: `url(${item.img})`}} data-wow-delay="0.2s">  
                            <div className="offer-content-line">
                                <div className="offer-title-wrapper-line">
                                    <i className={`bi ${item.icon} offer-icon-line`}></i>
                                    <h3 className="offer-title-line">{item.title}</h3>
                                </div>
                                <p className="offer-description-line" dangerouslySetInnerHTML={{__html: item.content}}></p>
                                <span className="offer-slogan-line">{item.slogan}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Offer1;