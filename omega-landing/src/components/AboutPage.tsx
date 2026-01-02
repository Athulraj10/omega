"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-6">
              About Omega Fresh Fish
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your trusted source for premium, sustainably-sourced seafood
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  Omega Fresh Fish was born from a passion for bringing the finest quality
                  seafood directly from the ocean to your table. We believe that everyone
                  deserves access to fresh, sustainably-sourced fish that's both delicious
                  and healthy.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our journey began with a simple mission: to connect customers with premium
                  quality fish while supporting sustainable fishing practices that protect
                  our oceans for future generations.
                </p>
              </div>
              <div className="text-center">
                <div className="p-10 bg-gradient-to-br from-[#5caf90]/10 to-[#5caf90]/5 rounded-2xl min-h-[300px] flex items-center justify-center">
                  <div className="text-[150px] opacity-30">🐟</div>
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide the freshest, highest-quality seafood while promoting
                  sustainable fishing practices and supporting local fishing communities.
                  We aim to make premium seafood accessible to everyone.
                </p>
              </div>
              <div className="p-8 bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading seafood provider known for quality, sustainability,
                  and customer satisfaction. We envision a future where sustainable seafood
                  is the norm, not the exception.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 text-center">
                Our Values
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5caf90] to-[#4a9a7a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🌊</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-3">Sustainability</h4>
                  <p className="text-gray-600">
                    We're committed to protecting our oceans through sustainable fishing practices
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5caf90] to-[#4a9a7a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⭐</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-3">Quality</h4>
                  <p className="text-gray-600">
                    Every product meets our strict quality standards for freshness and taste
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5caf90] to-[#4a9a7a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">❤️</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-3">Customer First</h4>
                  <p className="text-gray-600">
                    Your satisfaction is our priority. We're here to serve you better every day
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-[#5caf90]/10 to-[#5caf90]/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 text-center">
                Why Choose Us?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-[#5caf90] text-2xl mt-1">✓</span>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">
                      Direct from Source
                    </h4>
                    <p className="text-gray-600">
                      We work directly with trusted fisheries to ensure the freshest catch
                      reaches you quickly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#5caf90] text-2xl mt-1">✓</span>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">
                      Certified Sustainable
                    </h4>
                    <p className="text-gray-600">
                      All our suppliers are certified for sustainable fishing practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#5caf90] text-2xl mt-1">✓</span>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">
                      Fast Delivery
                    </h4>
                    <p className="text-gray-600">
                      Temperature-controlled packaging ensures freshness from ocean to your door.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#5caf90] text-2xl mt-1">✓</span>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">
                      Expert Support
                    </h4>
                    <p className="text-gray-600">
                      Our team is always ready to help you choose the perfect seafood for your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#5caf90] to-[#4a9a7a] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Ready to Experience Freshness?
            </h2>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Join thousands of satisfied customers enjoying premium quality seafood
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 bg-white text-[#5caf90] rounded-lg font-semibold text-lg border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-[#5caf90] transition-all duration-300 hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

