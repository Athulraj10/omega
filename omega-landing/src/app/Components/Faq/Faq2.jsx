    "use client"
    import Image from "next/image";
    import { useEffect, useRef, useState } from "react";

    const Faq2 = () => {

        const faqContent = [
            {
                title: 'How many years of experience do you have in the seafood industry?',
                content: 'We have over 40 years of experience in the seafood industry, built on deep market knowledge, long-term supplier relationships, and consistent quality standards.'
            },
            {
                title: 'Are you an Abu Dhabi–based company?',
                content: 'Yes, we are based in Abu Dhabi, operating in full compliance with UAE regulations and serving clients across the Emirates.'
            },
            {
                title: 'Where do you mainly source your seafood from?',
                content: 'We source seafood across the UAE, working closely with trusted local fishermen and suppliers. In addition, we import premium seafood from Europe and other international markets to ensure year-round availability and variety.'
            },
            {
                title: 'Do you supply both fresh and frozen seafood?',
                content: 'Yes, we supply both fresh and frozen seafood, carefully handled and stored to maintain optimal taste, texture, and nutritional value.'
            },
            {
                title: 'Do you cater to bulk and commercial orders?',
                content: 'Absolutely. We specialize in bulk and commercial supply, serving restaurants, hotels, retailers, and corporate clients with consistent and reliable deliveries.'
            }
        ];
        

        const accordionContentRef = useRef(null);
        const [openItemIndex, setOpenItemIndex] = useState(-1);
        const [firstItemOpen, setFirstItemOpen] = useState(true);
        
        const handleItemClick = index => {
            if (index === openItemIndex) {
            setOpenItemIndex(-1);
            } else {
            setOpenItemIndex(index);
            }
        };
        useEffect(() => {
            if (firstItemOpen) {
            setOpenItemIndex(0);
            setFirstItemOpen(false);
            }
        }, [firstItemOpen]);
        

        return (
            <div className="faq-section fix section-padding">
            <div className="container">
                <div className="title-area mb-45">
                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                        Faq
                        </div>
                    <div className="title wow fadeInUp" data-wow-delay="0.7s">
                        frequently ask question
                    </div>
                </div>
                <div className="row gx-60">
                    <div className="col-xl-5">
                        <div className="faq-thumb w-100 h-100 fix rounded-3">
                        <Image className="w-100 h-100 rounded-3" src="/assets/img/dishes/Faq2.png" alt="img" width={505} height={599}   />
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="faq-content style-1 mt-5">
                            <div className="faq-accordion">
                                <div className="accordion" id="accordion">
                                {faqContent.map((item, index) => (
                                    <div key={index} className={`accordion-item mb-3 ${index === openItemIndex ? "active" : "" }`}  data-wow-delay=".3s">
                                        <h5 onClick={() => handleItemClick(index)} className="accordion-header">
                                            <button className="accordion-button" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true"
                                                aria-controls="faq1">
                                                {item.title}
                                            </button>
                                        </h5>
                                        <div ref={accordionContentRef} id="faq1" className="accordion-collapse" data-bs-parent="#accordion">
                                            <div className="accordion-body">
                                            {item.content}
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        );
    };

    export default Faq2;