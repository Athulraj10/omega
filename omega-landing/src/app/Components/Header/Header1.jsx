"use client"
import { useState } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import Image from 'next/image';

export default function Header1({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  return (
    <div>
      <header
        className={`cs_site_header header_style_2 cs_style_1 cs_site_header_full_width ${
          variant ? variant : ''
        } ${mobileToggle ? 'cs_mobile_toggle_active' : ''}`}
        style={{ backgroundColor: '#fff', color: '#0D5189' }}
      >
        {/* Top Header */}
        {/* <div className="cs_top_header" style={{ backgroundColor: '#0D5189' }}>
          <div className="container">
            <div className="cs_top_header_in">
              <div className="cs_top_header_left header-info">
                <ul className="cs_top_nav d-flex align-items-center cs_fs_12 m-0 p-0 text-white">
                  <li>
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    Abu Dhabi, UAE
                  </li>
                </ul>
              </div>

              <div className="cs_top_header_right">
                <div className="cs_header_social_links">
                  <span className="text-white me-2">Follow Us:</span>
                  <ul>
                    <li>
                      <a
                        href="https://www.instagram.com/omega_seafoods/"
                        target="_blank"
                        className="text-white"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div> */}

        {/* Main Header */}
        <div className="cs_main_header border" style={{ backgroundColor: '#fff', color: '#0D5189' }}>
          <div className="container">
            <div className="cs_main_header_in">
              {/* Logo */}
              <div className="cs_main_header_left" style={{ 
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Link className="cs_site_branding" href="/" style={{ display: 'block' }}>
                  <Image
                    src="/assets/img/logo/logo.png"
                    alt="Omega Foods"
                    width={167}
                    height={58}
                    style={{ 
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '140px',
                      maxHeight: '50px',
                    }}
                    priority
                  />
                </Link>
              </div>

              {/* Navigation */}
              <div className="cs_main_header_center" style={{ 
                flex: '1 1 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}>
                <div className="cs_nav cs_primary_font fw-medium">
                  <span
                    className={`cs-munu_toggle ${mobileToggle ? 'cs_teggle_active' : ''}`}
                    onClick={() => setMobileToggle(!mobileToggle)}
                    style={{ color: '#0D5189' }}
                    aria-label="Toggle mobile menu"
                  >
                    <span></span>
                  </span>
                  <Nav setMobileToggle={setMobileToggle} />
                </div>
              </div>

              {/* Contact - Hidden on mobile */}
              {/* <div className="cs_main_header_right" style={{ 
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div 
                  className="header-contact-info d-flex align-items-center" 
                  style={{ 
                    color: '#0D5189',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <i className="bi bi-telephone-fill me-2"></i>
                  <div>
                    <span className="d-block fs-12">Call Us</span>
                    <strong style={{ fontSize: '14px' }}>+971 55 545 1188</strong>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className={`search-wrap ${searchToggle ? 'active' : ''}`}>
        <div className="search-inner">
          <i
            onClick={() => setSearchToggle(false)}
            className="bi bi-x-lg search-close"
          ></i>
          <div className="search-cell">
            <input
              type="search"
              className="main-search-input"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {/* Header spacing */}
      <div className="cs_site_header_spacing_130"></div>

      <style dangerouslySetInnerHTML={{__html: `
        .cs_main_header_in {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 15px;
        }
        @media screen and (max-width: 767px) {
          .cs_main_header_left {
            flex: 0 0 auto !important;
          }
          .cs_main_header_left img {
            max-width: 120px !important;
            max-height: 45px !important;
          }
          .cs_main_header_center {
            flex: 1 1 auto !important;
            justify-content: flex-end !important;
          }
          .cs_main_header_right {
            display: none !important;
          }
          .cs_main_header_in {
            gap: 10px !important;
          }
        }
        @media screen and (max-width: 575px) {
          .cs_main_header_left img {
            max-width: 100px !important;
            max-height: 40px !important;
          }
          .cs-munu_toggle {
            right: 0 !important;
          }
        }
        @media screen and (max-width: 991px) {
          .header-contact-info {
            font-size: 12px;
          }
          .header-contact-info strong {
            font-size: 13px;
          }
        }
      `}} />
    </div>
  );
}
