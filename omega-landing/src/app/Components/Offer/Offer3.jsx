// "use client"
// import { useEffect } from "react";
// import loadBackgroudImages from "../Common/loadBackgroudImages";
// import Link from "next/link";
// import Image from "next/image";

// const Offer3 = () => {

//     useEffect(() => {
//         loadBackgroudImages();
//       }, []);

//     return (
//         <div className="offer-section section-padding fix bg-color2" >
//         <div className="offer-shape">
//         <Image src="/assets/img/offer/offer-shape.png" alt="img" width={164} height={183}   />
//         </div>
//         <div className="offer-wrapper3">
//             <div className="container">
//                 <div className="row gy-4">
//                     <div className="col-lg-6">
//                         <div className="offer-card style1 rounded-5 wow fadeInUp" data-wow-delay="0.5s" data-background="/assets/img/bg/offerBG2_2.jpg"
//                             >
//                             <div className="offer-content">
//                                 <h6>start price $28</h6>
//                                 <h3>special chicken roll</h3>
//                                 <p>limits Time Offer</p>
//                                 <Link href="/menu" className="theme-btn style4">
//                                     ORDER NOW <i className="bi bi-arrow-right"></i>
//                                 </Link>
//                             </div>
//                             <div className="offer-thumb">
//                             <Image className="thumbImg" src="/assets/img/offer/offerThumb1_3.png" alt="img" width={276} height={260}   />
//                                 <div className="shape float-bob-x"><Image src="/assets/img/shape/offerShape1_4.png" alt="img" width={69} height={82}   /></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <div className="offer-card style1  rounded-5  wow fadeInUp" data-wow-delay="0.7s" data-background="/assets/img/bg/offerBG2_3.jpg"
//                            >
//                             <div className="offer-content">
//                                 <h6 className="text-white">start price $55</h6>
//                                 <h3>SPICY FRIED CHICKEN</h3>
//                                 <p className="text-white">limits Time Offer</p>
//                                 <Link href="/menu" className="theme-btn style4">
//                                     ORDER NOW <i className="bi bi-arrow-right"></i>
//                                 </Link>
//                             </div>
//                             <div className="offer-thumb">
//                             <Image className="thumbImg" src="/assets/img/offer/offerThumb1_1.png" alt="img" width={276} height={260}   />
//                                 <div className="shape float-bob-x"><Image src="/assets/img/shape/offerShape1_4.png" alt="img" width={69} height={82}   /></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     );
// };

// export default Offer3;