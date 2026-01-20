import Link from 'next/link';

export default function Nav({ setMobileToggle }) {
  const handleLinkClick = () => {
    if (setMobileToggle) {
      setMobileToggle(false);
    }
  };

  return (
    <ul className="cs_nav_list fw-medium flex gap-6" style={{ color: '#0D5189' }}>
      <li >
        <Link href="/" onClick={handleLinkClick} style={{ color: '#0D5189' }}>Home</Link>
      </li>

      <li >
        <Link href="/shop" onClick={handleLinkClick} style={{ color: '#0D5189' }}>
        Products
        </Link>
      </li>

      <li >
        <Link href="/about" onClick={handleLinkClick} style={{ color: '#0D5189' }}>About Us</Link>
        {/* <DropDown>
          <ul>
          <li>
              <Link href="/about" onClick={() => setMobileToggle(false)}>
                About Us 1
              </Link>
            </li>
            <li>
              <Link href="/about2" onClick={() => setMobileToggle(false)}>
                About Us 2
              </Link>
            </li>            
            <li>
              <Link href="/chef" onClick={() => setMobileToggle(false)}>
              Chef
              </Link>
            </li>            
            <li>
              <Link href="/chef/chef-details" onClick={() => setMobileToggle(false)}>
              Chef Details 1
              </Link>
            </li> 
            <li>
              <Link href="/chef/chef-details2" onClick={() => setMobileToggle(false)}>
              Chef Details 2
              </Link>
            </li>                       
            <li>
              <Link href="/gallery" onClick={() => setMobileToggle(false)}>
              Gallery
              </Link>
            </li> 
            <li>
              <Link href="/service" onClick={() => setMobileToggle(false)}>
              Services
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
              Service Details
              </Link>
            </li>                        
            <li>
              <Link href="/testimonial" onClick={() => setMobileToggle(false)}>
              Testimonials
              </Link>
            </li>  
            <li>
              <Link href="/reservation" onClick={() => setMobileToggle(false)}>
              Reservation
              </Link>
            </li>                      
            <li>
              <Link href="/faq" onClick={() => setMobileToggle(false)}>
              Faq
              </Link>
            </li> 
                      
          </ul>
        </DropDown> */}
      </li>  


      {/* <li >
        <Link href="/blog" onClick={() => setMobileToggle(false)} style={{ color: '#0D5189' }}>
          Blog
        </Link></li> */}

  
  
     
      <li >
        <Link href="/contact" onClick={handleLinkClick} style={{ color: '#0D5189' }}>
        Contact
        </Link>
      </li>

    </ul>
  );
}
