import Image from "next/image";
import Link from "next/link";

const About1 = () => {

    const aboutContent = {  
        img1:'/assets/img/shape/aboutShape1_1.png',  
        img2:'/assets/img/shape/aboutShape1_3.png',  
        img3:'/assets/img/shape/aboutShape1_4.png',  
        img4:'/assets/img/shape/aboutShape1_6.png',  
        subtitle:"About US",
        title:'Variety of flavours from american cuisine',
        content:'It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point established fact that',  
      } 

    return (
        <section className="about-us-section fix section-padding pb-0">
        <div className="about-wrapper style1">
            <div className="shape3 d-none d-xxl-block"><Image src={aboutContent.img2} alt="img" className="cir36" width={280} height={350}   /></div>
            <div className="shape6 d-none d-xxl-block"><Image src={aboutContent.img4} alt="img" className="cir36" width={280} height={350}   /></div>
         
         
         
            {/* <div className="shape1 d-none d-xxl-block"><Image src={aboutContent.img1} alt="img" width={432} height={552}   /></div>
            <div className="shape4 d-none d-xxl-block"><Image src={aboutContent.img3} alt="img" width={432} height={552}   /></div>  */}
            
            
            {/* <div className="shape2 d-none d-xxl-block"><Image src="/assets/img/shape/aboutShape1_2.png" alt="img" width={181} height={289}   /></div> */}
            <div className="shape5 d-none d-xxl-block"><Image src="/assets/img/shape/aboutShape1_5.png" alt="img" width={173} height={277}   /></div>
         
         
            <div className="container">
                <div className="about-us section-padding">
                    <div className="row">
                        <div className="col-12">
                            <div className="title-area">
                                <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                    {aboutContent.subtitle}<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                                </div>
                                <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                                {aboutContent.title}
                                </h2>
                                <div className="text wow fadeInUp" data-wow-delay="0.8s">{aboutContent.content}</div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default About1;