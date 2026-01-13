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
  className={`cs_site_header header_style_2 cs_style_1 cs_site_header_full_width text-white ${
    variant ? variant : ''
  } ${mobileToggle ? 'cs_mobile_toggle_active' : ''}`}
  style={{ backgroundColor: '#1a365d', color: '#fff' }}
>


        {/* Top Header */}
        {/* <div className="cs_top_header" style={{ backgroundColor: '#1a365d' }}>
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
        <div className="cs_main_header" style={{ backgroundColor: '#1a365da7' ,color:'#fff'}}>
          <div className="container">
            <div className="cs_main_header_in">

              {/* Logo */}
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" href="/">
                  <Image
                    src="/assets/img/logo/logoWhite.svg"
                    alt="Omega Foods"
                    width={167}
                    height={58}
                  />
                </Link>
              </div>

              {/* Navigation */}
              <div className="cs_main_header_center">
                <div className="cs_nav cs_primary_font fw-medium">
                  <span
                    className={`cs-munu_toggle ${mobileToggle ? 'cs_teggle_active' : ''}`}
                    onClick={() => setMobileToggle(!mobileToggle)}
                    style={{ color: '#fff' }}
                  >
                    <span></span>
                  </span>
                  <Nav setMobileToggle={setMobileToggle} />
                </div>
              </div>

              {/* Contact */}
              <div className="cs_main_header_right">
                <div className="header-contact-info text-white d-flex align-items-center">
                  <i className="bi bi-telephone-fill me-2"></i>
                  <div>
                    <span className="d-block fs-12">Call Us</span>
                    <strong>+971 56 888 8888</strong>
                  </div>
                </div>
              </div>

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
    </div>
  );
}
