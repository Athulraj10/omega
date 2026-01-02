"use client";

import NavbarIntro from "./header/NavbarIntro";
import Navbar from "./header/Navbar";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <NavbarIntro />
      <Navbar />
    </header>
  );
}
