"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import LottieFishAnimation from "./LottieFishAnimation";

export default function LandingPage() {
  // Smooth scroll effect for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e: any) => {
      if (e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);

    return () => {
      document.removeEventListener("click", handleSmoothScroll);
    };
  }, []);

  return (
    <div className="overflow-x-hidden relative">
      {/* Lottie Fish Animations */}
      <LottieFishAnimation />
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50/40 to-white/40 backdrop-blur-sm min-h-[600px] flex items-center relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="py-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Fresh Ocean to Your Table
                <span className="block text-[#5caf90] mt-2">Omega Fresh Fish</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the finest selection of premium, sustainably-sourced fish.
                Delivered fresh to your doorstep with unmatched quality and taste.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link
                  href="#"
                  className="px-10 py-4 bg-[#5caf90] text-white rounded-lg font-semibold text-lg hover:bg-[#4a9a7a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Shop Now
                </Link>
                <Link
                  href="#features"
                  className="px-10 py-4 border-2 border-[#5caf90] text-[#5caf90] rounded-lg font-semibold text-lg hover:bg-[#5caf90] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="p-10 bg-gradient-to-br from-[#5caf90]/10 to-[#5caf90]/5 rounded-2xl min-h-[400px] flex items-center justify-center">
                <div className="text-[200px] opacity-30">🐟</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="my-10">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden">
            <Swiper
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              loop={true}
              speed={2000}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              className="swiper-pagination-white"
            >
              <SwiperSlide
                className="h-[600px] bg-cover bg-center bg-[url('/hero-bg-1.jpg')] flex items-center relative"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200')",
                }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl text-white relative z-10 ml-0 md:ml-24 p-10">
                      <p className="text-xl font-medium mb-5 text-white drop-shadow-lg">
                        Premium Quality Fish Starting at <b className="text-[#5caf90] font-bold">AED 49 per kg</b>
                      </p>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg leading-tight">
                        Fresh Ocean to Your Table
                      </h1>
                      <Link
                        href="#"
                        className="inline-flex items-center px-10 py-4 bg-[#5caf90] text-white rounded-lg font-medium text-base hover:bg-[#4a9a7a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Shop Now <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="h-[600px] bg-cover bg-center flex items-center relative"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200')",
                }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl text-white relative z-10 ml-0 md:ml-24 p-10">
                      <p className="text-xl font-medium mb-5 text-white drop-shadow-lg">
                        Sustainably Sourced & Delivered Fresh
                      </p>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg leading-tight">
                        Omega Fresh Fish - Quality You Can Trust
                      </h1>
                      <Link
                        href="#"
                        className="inline-flex items-center px-10 py-4 bg-[#5caf90] text-white rounded-lg font-medium text-base hover:bg-[#4a9a7a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Explore Collection <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="h-[600px] bg-cover bg-center flex items-center relative"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200')",
                }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl text-white relative z-10 ml-0 md:ml-24 p-10">
                      <p className="text-xl font-medium mb-5 text-white drop-shadow-lg">
                        Daily Fresh Catch - Maximum Flavor
                      </p>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg leading-tight">
                        Experience the Finest Selection
                      </h1>
                      <Link
                        href="#"
                        className="inline-flex items-center px-10 py-4 bg-[#5caf90] text-white rounded-lg font-medium text-base hover:bg-[#4a9a7a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Shop Now <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Image Gallery Slider */}
      <section className="py-16 bg-gray-50/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Our Premium Selection
            </h2>
            <p className="text-lg text-gray-600">
              Discover our finest collection of fresh seafood
            </p>
          </div>
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="gallery-swiper"
          >
            <SwiperSlide>
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src="/assets/img/hero-bg/1.jpg"
                  alt="Fresh Fish Selection 1"
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-semibold text-lg">Premium Quality</h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src="/assets/img/hero-bg/2.jpg"
                  alt="Fresh Fish Selection 2"
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-semibold text-lg">Daily Fresh</h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src="/assets/img/hero-bg/3.jpg"
                  alt="Fresh Fish Selection 3"
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-semibold text-lg">Sustainable Source</h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src="/assets/img/hero-bg/4.jpg"
                  alt="Fresh Fish Selection 4"
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-semibold text-lg">Ocean Fresh</h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src="/assets/img/hero-bg/5.jpg"
                  alt="Fresh Fish Selection 5"
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-semibold text-lg">Premium Catch</h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src="/assets/img/hero-bg/6.jpg"
                  alt="Fresh Fish Selection 6"
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-semibold text-lg">Quality Assured</h3>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Why Choose Omega Fresh?
            </h2>
            <p className="text-lg text-gray-600">
              We bring you the ocean&apos;s best, every single time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-10 bg-gray-50 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-[#5caf90] to-[#4a9a7a] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Hand-selected, premium fish sourced directly from trusted suppliers.
                Every catch meets our strict quality standards.
              </p>
            </div>
            <div className="text-center p-10 bg-gray-50 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-[#5caf90] to-[#4a9a7a] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⏰</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Fresh Daily</h3>
              <p className="text-gray-600 leading-relaxed">
                Our fish are caught fresh daily and delivered to you within 24 hours,
                ensuring maximum freshness and flavor.
              </p>
            </div>
            <div className="text-center p-10 bg-gray-50 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-[#5caf90] to-[#4a9a7a] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚚</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick and reliable delivery service with temperature-controlled packaging
                to maintain freshness during transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50/40 to-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="p-10 bg-gradient-to-br from-[#5caf90]/10 to-[#5caf90]/5 rounded-2xl min-h-[350px] flex items-center justify-center">
                <div className="text-[150px] opacity-30">🛡️</div>
              </div>
            </div>
            <div className="py-5">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
                Sustainable & Healthy
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Omega Fresh Fish is committed to sustainable fishing practices and delivering
                the healthiest options to your family. Our fish are rich in Omega-3 fatty acids
                and essential nutrients.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <span className="text-[#5caf90] text-xl mr-4 mt-1">✓</span>
                  <span className="text-gray-700 flex-1 leading-relaxed">
                    Sustainably sourced from certified fisheries
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5caf90] text-xl mr-4 mt-1">✓</span>
                  <span className="text-gray-700 flex-1 leading-relaxed">
                    No preservatives or additives
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5caf90] text-xl mr-4 mt-1">✓</span>
                  <span className="text-gray-700 flex-1 leading-relaxed">
                    Hygienically processed and packaged
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5caf90] text-xl mr-4 mt-1">✓</span>
                  <span className="text-gray-700 flex-1 leading-relaxed">
                    Traceable from ocean to your table
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#5caf90] to-[#4a9a7a] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Ready to Experience Freshness?
            </h2>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Start your journey with Omega Fresh Fish today and discover the difference
              that premium quality makes.
            </p>
            <Link
              href="#"
              className="inline-block px-12 py-5 bg-white text-[#5caf90] rounded-lg font-semibold text-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Explore Our Selection
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* Hero Slider Pagination */
        .swiper-pagination-bullet {
          width: 15px;
          height: 15px;
          margin: 0 5px !important;
          background-color: transparent;
          border: 2px solid white;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: white;
          width: 30px;
          border-radius: 15px;
        }
        .swiper-pagination {
          bottom: 30px !important;
        }
        
        /* Gallery Slider Pagination */
        .gallery-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          margin: 0 4px !important;
          background-color: #5caf90;
          opacity: 0.5;
          border: none;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background-color: #5caf90;
          opacity: 1;
          width: 24px;
          border-radius: 12px;
        }
        .gallery-swiper .swiper-pagination {
          bottom: 20px !important;
        }
      `}</style>
      </div>
    </div>
  );
}

