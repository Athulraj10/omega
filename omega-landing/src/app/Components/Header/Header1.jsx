"use client"
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import Image from 'next/image';
export default function Header1({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [searchToggle, setSearchToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        setIsSticky('cs-gescout_sticky'); // Scrolling down
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky'); // Scrolling up
      } else {
        setIsSticky();
      }
      setPrevScrollPos(currentScrollPos); // Update previous scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup the event listener
    };
  }, [prevScrollPos]);

  return (
    <div>
    <style dangerouslySetInnerHTML={{__html: `
      .cs_top_header .cs_top_nav li,
      .cs_top_header .cs_top_nav li i,
      .cs_top_header .top-header-social-icon,
      .cs_top_header .top-header-social-icon a,
      .cs_top_header .top-header-social-icon a i,
      .header-contact-info .phone-icon-wrapper i,
      .header-contact-info .call-us-text,
      .header-contact-info .phone-number {
        color: #fff !important;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.3) !important;
      }
      .cs_top_header {
        background:rgba(13, 58, 94, 0.48) !important;
      }
      .cs_main_header {
        background: rgba(0, 0, 0, 0.1);
      }
    `}} />
    <header
      className={`cs_site_header header_style_2 cs_style_1 header_sticky_style1 ${
        variant ? variant : ''
      } cs_sticky_header cs_site_header_full_width ${
        mobileToggle ? 'cs_mobile_toggle_active' : ''
      } ${isSticky ? isSticky : ''}`}
    >
      <div className="cs_top_header">
        <div className="container">
          <div className="cs_top_header_in">
            <div className="cs_top_header_left header-info">
              <ul className="cs_top_nav d-flex flex-wrap align-items-center cs_fs_12 m-0 p-0" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                <li style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                  <i className="bi bi-geo-alt-fill" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)', marginRight: '6px' }}></i>Abu Dhabi, UAE
                </li>
               </ul>
            </div>
            <div className="cs_top_header_right">
            <div className="cs_header_social_links_wrap">
                <div className="cs_header_social_links top-header-social-icon" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                Follow Us:
                  <ul>
                      <li><a target="_blank" href="https://www.instagram.com/omega_seafoods/?igsh=amYzcjVwNndiNDQ1&utm_source=qr#" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}><i className="bi bi-instagram"></i></a></li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      

      <div className="cs_main_header">
        <div className="container">
          <div className="cs_main_header_in">
            <div className="cs_main_header_left">
              <Link className="cs_site_branding" href="/">
                <Image src="/assets/img/logo/logoWhite.svg" alt="img" width={167} height={58}   />
              </Link>
              </div>
              <div className="cs_main_header_center">
                <div className="cs_nav cs_primary_font fw-medium">
                  <span
                    className={
                      mobileToggle
                        ? 'cs-munu_toggle cs_teggle_active'
                        : 'cs-munu_toggle'
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                  <Nav setMobileToggle={setMobileToggle} />
                </div>
            </div>
            <div className="cs_main_header_right">
              <div className="header-right-section">
                <div className="header-reserve-section">
                  <div className="header-contact-info">
                    <div className="phone-icon-wrapper">
                      <i className="bi bi-telephone-fill" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}></i>
                    </div>
                    <div className="contact-text">
                      <span className="call-us-text" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Call Us</span>
                      <span className="phone-number" style={{ color: '#fff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>+971 56 888 8888</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div className={`search-wrap ${searchToggle ? 'active' : ''}`} >
            <div className="search-inner">
                <i onClick={() => setSearchToggle(!searchToggle)} className="bi bi-x-lg search-close" id="search-close"></i>
                <div className="search-cell">
                    <form method="get">
                        <div className="search-field-holder">
                            <input type="search" className="main-search-input" placeholder="Search..." />
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="cs_site_header_spacing_130"></div>

    </div>

  );
}
