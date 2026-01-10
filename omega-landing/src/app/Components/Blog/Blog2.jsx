import Image from "next/image";
import Link from "next/link";

const Blog2 = () => {

    const blogItems = [
        {img:'/assets/img/blog/blogThumb4_1.jpg', title:'Top 10 Must-Try Dishes at Our Restaurant', content:'Get to know the top 10 dishes you must try our fast savor when you visit our restaurant, Savor fast food from appetizers to desserts...'},     
        {img:'/assets/img/blog/blogThumb4_2.jpg', title:'Take a behind-the-scenes look at a typical day', content:'Get to know the top 10 dishes you must try our fast savor when you visit our restaurant, Savor fast food from appetizers to desserts...'},     
        {img:'/assets/img/blog/blogThumb4_3.jpg', title:'Learn the secrets to making perfect pasta', content:'Get to know the top 10 dishes you must try our fast savor when you visit our restaurant, Savor fast food from appetizers to desserts...'},     
      ]; 

    return (
        <section className="blog-section section-padding fix">
        <div className="blog-wrapper style2">
            <div className="shape1"><Image src="/assets/img/shape/blogShape3_1.png" alt="img" width={278} height={159}   /></div>
            <div className="container">
                <div className="blog-card-wrap style2">
                    <div className="title-area">
                        <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                        <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                            LATEST BLOG<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                        </div>
                        <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                            Latest News & Articles
                        </h2>
                    </div>
                    <div className="row">
                    {blogItems.map((item, i) => (
                        <div key={i} className="col-lg-4">
                            <div className="blog-card style2 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="blog-thumb">
                                <Image src={item.img} alt="img" width={414} height={308}   />
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <div className="item1">
                                            <h6>15</h6>
                                            <p>August</p>
                                        </div>
                                        <div className="items-wrap">
                                            <div className="item2">
                                                <div className="icon"><i className="bi bi-person"></i> <span>By Admin</span>
                                                </div>
                                            </div>
                                            <div className="item3">
                                                <div className="icon"><i className="bi bi-chat"></i><span>Comments(5)</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/blog/blog-details">
                                        <h3>{item.title}</h3>
                                    </Link>
                                    <p>{item.content}</p>
                                    <Link href="/blog/blog-details" className="link-btn">
                                        <span>Read More</span> <i className="bi bi-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Blog2;