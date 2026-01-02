"use client";

import Link from "next/link";

export default function NavbarIntro() {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Left side - Contact info */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
            <Link href="tel:+919876543210" className="flex items-center gap-2 hover:text-[#5caf90] transition-colors">
              <span>📞</span>
              <span>+91 987 654 3210</span>
            </Link>
            <Link href="https://wa.me/919876543210" className="flex items-center gap-2 hover:text-[#5caf90] transition-colors">
              <span>💬</span>
              <span>+91 987 654 3210</span>
            </Link>
          </div>

          {/* Center - Welcome message */}
          <div className="hidden md:block text-center text-sm text-gray-600">
            Welcome to Omega Fresh Fish
          </div>

          {/* Right side - Language & Currency */}
          <div className="hidden lg:flex items-center gap-4 text-sm text-gray-600">
            <select className="bg-transparent border-none outline-none cursor-pointer hover:text-[#5caf90] transition-colors">
              <option>English</option>
            </select>
            <select className="bg-transparent border-none outline-none cursor-pointer hover:text-[#5caf90] transition-colors">
              <option>AED</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
