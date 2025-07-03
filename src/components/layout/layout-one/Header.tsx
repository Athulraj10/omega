"use client";
import HeaderManu from "./header/HeaderManu";
import HeaderOne from "./header/HeaderOne";
import HeaderTwo from "./header/HeaderTwo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import FeatureTools from "@/theme/ThemeSwitcher";

function Header() {
  const cartItems = useSelector((state: RootState) => state?.cart);
  const wishlistItems = useSelector((state: RootState) => state.wishlist);
  return (
    <header className="gi-header">
      {/* <FeatureTools />  right side bar change colors function */}
      {/* <HeaderOne wishlistItems={wishlistItems} cartItems={cartItems} /> */}
      <HeaderTwo cartItems={cartItems} wishlistItems={wishlistItems} />
      <HeaderManu />
    </header>
  );
}

export default Header;
